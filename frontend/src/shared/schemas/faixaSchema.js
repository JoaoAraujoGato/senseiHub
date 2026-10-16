import { z } from 'zod';
import { COR_HEX } from '@shared/rules';

export const faixaSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    ordem: z.coerce.number().int('Ordem deve ser inteira').positive('Ordem deve ser positiva'),
    corPrincipalHex: z.string().regex(COR_HEX, 'Use o formato #RRGGBB'),
    corSecundariaHex: z.string().regex(COR_HEX, 'Use o formato #RRGGBB').optional().or(z.literal('')),
});
