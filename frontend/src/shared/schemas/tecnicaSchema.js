import { z } from 'zod';

export const tecnicaSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    nomeTraduzido: z.string().trim().min(1, 'Nome traduzido é obrigatório'),
    categoria: z.string().trim().min(1, 'Categoria é obrigatória'),
    subCategoria: z.string().trim().min(1, 'Subcategoria é obrigatória'),
    videoUrl: z.string().trim().url('URL inválida').optional().or(z.literal('')),
    descricao: z.string().optional(),
});
