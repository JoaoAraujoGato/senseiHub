import {
    GENEROS,
    PAPEIS_PROFESSOR,
    STATUS_ATLETA,
    DIAS_SEMANA as DIAS_SEMANA_ENUM,
    optionsOf,
} from '@shared/enums';

// Listas de opções derivadas dos enums compartilhados (para selects/UI).
export const GENERO_OPTIONS = optionsOf(GENEROS);
export const PAPEL_OPTIONS = optionsOf(PAPEIS_PROFESSOR);
export const STATUS_ATLETA_OPTIONS = optionsOf(STATUS_ATLETA);
export const DIAS_SEMANA = optionsOf(DIAS_SEMANA_ENUM);
