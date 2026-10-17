import { z } from 'zod';
import { GENEROS, STATUS_ATLETA } from '@shared/enums';
import { isMenorDeIdade } from '@/shared/idade';

const GENEROS_VALUES = Object.values(GENEROS).map(g => g.value);
const STATUS_VALUES = Object.values(STATUS_ATLETA).map(s => s.value);

export const atletaSchema = z.object({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    email: z.string().trim().email('E-mail inválido').optional().or(z.literal('')),
    dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
    genero: z.enum(GENEROS_VALUES).optional().or(z.literal('')),
    peso: z.string().optional(),
    faixa: z.string().optional().or(z.literal('')),
    turmas: z.array(z.string()).optional(),
    status: z.enum(STATUS_VALUES).default(STATUS_VALUES[0]),

    // saúde / apoio
    alergias: z.string().optional(),
    observacoes: z.string().optional(),

    // menor de idade
    nomeMae: z.string().optional(),
    contatoMae: z.string().optional(),
    nomePai: z.string().optional(),
    contatoPai: z.string().optional(),

    // maior de idade (contato de emergência)
    emergenciaNome: z.string().optional(),
    emergenciaParentesco: z.string().optional(),
    emergenciaParentescoOutro: z.string().optional(),
    emergenciaContato: z.string().optional(),
}).superRefine((v, ctx) => {
    if (isMenorDeIdade(v.dataNascimento)) {
        const temMae = Boolean(v.nomeMae && v.contatoMae);
        const temPai = Boolean(v.nomePai && v.contatoPai);
        if (!temMae && !temPai) {
            ctx.addIssue({
                code: 'custom',
                path: ['nomeMae'],
                message: 'Informe ao menos um responsável (mãe ou pai) com contato',
            });
        }
    }
});
