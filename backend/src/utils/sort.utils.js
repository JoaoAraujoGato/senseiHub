/*
    // 1 campo
    parseSortQuery('nome:asc') → { nome: 1 }

    parseSortQuery('nome:desc') → { nome: -1 }

    // múltiplos campos
    parseSortQuery('categoria:asc,subcategoria:asc,nome:desc') → { categoria: 1, subcategoria: 1, nome: -1 }

    // sem ordem definida → assume asc por padrão
    parseSortQuery('nome') → { nome: 1 }

    parseSortQuery('categoria,nome:desc') → { categoria: 1, nome: -1 }
*/
export const parseSortQuery = (sortStr) => {
    return Object.fromEntries(
        sortStr.split(',').map((field) => {
            const [key, order = 'asc'] = field.split(':');
            return [key, order === 'desc' ? -1 : 1];
        })
    );
};