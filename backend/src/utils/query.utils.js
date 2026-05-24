// modos disponíveis para campos de texto
export const QUERY_MODES = {
    EXACT: 'exact',       // nome exato, case/accent insensitive
    PARTIAL: 'partial',   // contém o texto, case/accent insensitive
};

// converte um valor de filtro para regex do mongo dependendo do modo
export const buildTextFilter = (value, mode = QUERY_MODES.EXACT) => {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escapa caracteres especiais

    const pattern = mode === QUERY_MODES.PARTIAL
        ? escaped          // contém: /texto/i
        : `^${escaped}$`;  // exato:  /^texto$/i

    return {
        $regex: pattern,
        $options: 'i',  // case insensitive + accent insensitive (collation do mongo)
    };
};

// percorre os filtros e converte campos de texto conforme o modo
export const normalizeFilters = (filtros, textFields = [], mode = QUERY_MODES.EXACT) => {
    return Object.fromEntries(
        Object.entries(filtros).map(([key, value]) => {
            const isTextField = textFields.includes(key) && typeof value === 'string';
            return [key, isTextField ? buildTextFilter(value, mode) : value];
        })
    );
};

/*
    // 1) busca exata (usa o padrão da entidade)
    POST /faixas/query
    body: { "nome": "faixa azul" }
    // → encontra "Faixa Azul", "FAIXA AZUL", "fàixá àzul"

    // 2) busca parcial (sobrescreve o modo no body)
    POST /faixas/query
    body: { "nome": "azul", "mode": "partial" }
    // → encontra "Faixa Azul", "Faixa Azul Escuro", "Tom Azulado"

    // 3) misturando campo texto e campo normal
    POST /faixas/query
    body: { "nome": "azul", "ativo": true, "mode": "partial" }
    // → ativo: true fica como está, nome vira regex
*/