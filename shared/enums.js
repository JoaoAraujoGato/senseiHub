// Enums compartilhados entre backend e frontend (fonte única de valores).
// Cada item é { value, label }. Use optionsOf() para virar lista de opções de UI.

export const GENEROS = {
    MASCULINO: { value: 'masculino', label: 'Masculino' },
    FEMININO: { value: 'feminino', label: 'Feminino' },
};

export const PAPEIS_PROFESSOR = {
    ADMIN: { value: 'admin', label: 'Administrador' },
    PROFESSOR: { value: 'professor', label: 'Professor' },
};

export const STATUS_ATLETA = {
    ATIVO: { value: 'ativo', label: 'Ativo' },
    INATIVO: { value: 'inativo', label: 'Inativo' },
};

export const RESPOSAVEL_PARENTESCO = {
    PAI: { value: 'pai', label: 'Pai' },
    MAE: { value: 'mae', label: 'Mãe' },
    RESPONSAVEL_LEGAL: { value: 'responsavel_legal', label: 'Responsável Legal' },
    AVO: { value: 'avo', label: 'Avô/Avó' },
    TIO: { value: 'tio', label: 'Tio/Tia' },
    OUTRO: { value: 'outro', label: 'Outro' },
};

export const DIAS_SEMANA = {
    SEGUNDA: { value: 'segunda', label: 'Segunda' },
    TERCA: { value: 'terca', label: 'Terça' },
    QUARTA: { value: 'quarta', label: 'Quarta' },
    QUINTA: { value: 'quinta', label: 'Quinta' },
    SEXTA: { value: 'sexta', label: 'Sexta' },
    SABADO: { value: 'sabado', label: 'Sábado' },
    DOMINGO: { value: 'domingo', label: 'Domingo' },
};

export const optionsOf = (enumObj) => Object.values(enumObj);
