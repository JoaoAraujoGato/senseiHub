import { z } from 'zod';
import { PAPEIS_PROFESSOR, GENEROS } from '@shared/enums';

const PAPEIS = Object.values(PAPEIS_PROFESSOR).map(p => p.value);
const GENEROS_VALUES = Object.values(GENEROS).map(g => g.value);

export const professorSchema = (isEdicao = false) => z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    email: z.string().trim().email('E-mail inválido'),
    senha: isEdicao
        ? z.string().min(6, 'Mínimo 6 caracteres').optional().or(z.literal(''))
        : z.string().min(6, 'Mínimo 6 caracteres'),
    numeroContato: z.string().optional(),
    papel: z.enum(PAPEIS).optional().or(z.literal('')),
    genero: z.enum(GENEROS_VALUES).optional().or(z.literal('')),
});
