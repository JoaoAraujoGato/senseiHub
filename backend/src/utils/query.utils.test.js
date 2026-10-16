import { describe, it, expect } from 'vitest';
import { buildTextFilter, normalizeFilters, QUERY_MODES } from './query.utils.js';

describe('query.utils', () => {
    it('buildTextFilter no modo EXACT ancora com ^$', () => {
        expect(buildTextFilter('azul', QUERY_MODES.EXACT)).toEqual({ $regex: '^azul$', $options: 'i' });
    });

    it('buildTextFilter no modo PARTIAL não ancora', () => {
        expect(buildTextFilter('azul', QUERY_MODES.PARTIAL)).toEqual({ $regex: 'azul', $options: 'i' });
    });

    it('escapa caracteres especiais de regex', () => {
        expect(buildTextFilter('a.b', QUERY_MODES.PARTIAL).$regex).toBe('a\\.b');
    });

    it('normalizeFilters converte só os textFields', () => {
        const out = normalizeFilters({ nome: 'azul', ordem: 3 }, ['nome'], QUERY_MODES.PARTIAL);
        expect(out.nome).toEqual({ $regex: 'azul', $options: 'i' });
        expect(out.ordem).toBe(3);
    });
});
