import { describe, it, expect } from 'vitest';
import { atletaSchema } from './atletaSchema';

const base = { nome: 'Ana', status: 'ativo' };

describe('atletaSchema (campos condicionais por idade)', () => {
    it('exige data de nascimento', () => {
        expect(atletaSchema.safeParse(base).success).toBe(false);
    });

    it('menor sem responsável falha', () => {
        expect(atletaSchema.safeParse({ ...base, dataNascimento: '2015-01-01' }).success).toBe(false);
    });

    it('menor com a mãe passa', () => {
        const r = atletaSchema.safeParse({ ...base, dataNascimento: '2015-01-01', nomeMae: 'Maria', contatoMae: '1199' });
        expect(r.success).toBe(true);
    });

    it('menor com o pai passa', () => {
        const r = atletaSchema.safeParse({ ...base, dataNascimento: '2015-01-01', nomePai: 'João', contatoPai: '1188' });
        expect(r.success).toBe(true);
    });

    it('maior sem contato de emergência passa', () => {
        expect(atletaSchema.safeParse({ ...base, dataNascimento: '1990-01-01' }).success).toBe(true);
    });
});
