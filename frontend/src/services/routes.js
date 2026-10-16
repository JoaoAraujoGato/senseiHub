// Constantes de endpoint do backend. Nenhuma URL solta nos serviços.
// ponytail: URL fixa em dev; migrar para import.meta.env/proxy quando houver deploy
export const API_URL = 'http://localhost:3000';

export const ROUTES = {
    AUTH_LOGIN: '/auth/login',
    FAIXA: '/faixa',
    PROFESSOR: '/professor',
    ATLETA: '/atleta',
    TURMA: '/turma',
    TECNICA: '/tecnica',
};
