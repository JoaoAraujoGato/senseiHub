import { z } from 'zod';

export const turmaSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    capacidadeMaxima: z.coerce.number().int('Deve ser inteiro').positive('Deve ser positivo'),
    horarioInicio: z.string().min(1, 'Informe o horário de início'),
    horarioFim: z.string().min(1, 'Informe o horário de término'),
    dias: z.array(z.string()).optional(),
    professorResponsavel: z.array(z.string()).min(1, 'Selecione ao menos um professor'),
    descricao: z.string().optional(),
});
