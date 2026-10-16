import { z } from 'zod';
import { GENEROS, STATUS_ATLETA } from '@shared/enums';

const GENEROS_VALUES = Object.values(GENEROS).map(g => g.value);
const STATUS_VALUES = Object.values(STATUS_ATLETA).map(s => s.value);

export const atletaSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    email: z.string().trim().email('E-mail inválido').optional().or(z.literal('')),
    dataNascimento: z.string().optional(),
    genero: z.enum(GENEROS_VALUES).optional().or(z.literal('')),
    peso: z.string().optional(),
    faixa: z.string().optional().or(z.literal('')),
    turmas: z.array(z.string()).optional(),
    status: z.enum(STATUS_VALUES).default(STATUS_VALUES[0]),
    descricaoMedica: z.string().optional(),
});
