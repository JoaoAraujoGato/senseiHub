import { describe, it, expect } from 'vitest';
import { faixaSchema } from './faixaSchema';

describe('faixaSchema', () => {
    it('aceita uma faixa válida', () => {
        const r = faixaSchema.safeParse({ nome: 'Azul', ordem: '3', corPrincipalHex: '#123456' });
        expect(r.success).toBe(true);
    });

    it('rejeita nome em branco', () => {
        expect(faixaSchema.safeParse({ nome: '   ', ordem: 1, corPrincipalHex: '#123456' }).success).toBe(false);
    });

    it('rejeita cor fora do formato #RRGGBB', () => {
        expect(faixaSchema.safeParse({ nome: 'A', ordem: 1, corPrincipalHex: 'vermelho' }).success).toBe(false);
    });

    it('coage ordem de texto para número', () => {
        expect(faixaSchema.parse({ nome: 'A', ordem: '5', corPrincipalHex: '#000000' }).ordem).toBe(5);
    });

    it('aceita cor secundária ausente ou vazia', () => {
        expect(faixaSchema.safeParse({ nome: 'A', ordem: 1, corPrincipalHex: '#000000' }).success).toBe(true);
        expect(faixaSchema.safeParse({ nome: 'A', ordem: 1, corPrincipalHex: '#000000', corSecundariaHex: '' }).success).toBe(true);
    });
});
