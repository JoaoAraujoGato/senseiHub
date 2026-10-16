// Regras de validação compartilhadas entre backend (Mongoose) e frontend (zod).

export const COR_HEX = /^#[0-9a-fA-F]{6}$/;
export const EMAIL = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;
