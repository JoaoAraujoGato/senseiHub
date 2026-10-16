import { describe, it, expect, beforeAll } from 'vitest';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './auth.middlewares.js';

const makeRes = () => {
    const res = { code: 0, body: null };
    res.status = (c) => { res.code = c; return res; };
    res.json = (b) => { res.body = b; return res; };
    return res;
};

describe('authMiddleware', () => {
    beforeAll(() => { process.env.JWT_SECRET = 'test-secret'; });

    it('retorna 401 sem header Authorization', () => {
        const res = makeRes();
        let next = false;
        authMiddleware({ headers: {} }, res, () => { next = true; });
        expect(res.code).toBe(401);
        expect(next).toBe(false);
    });

    it('retorna 401 com header sem Bearer', () => {
        const res = makeRes();
        let next = false;
        authMiddleware({ headers: { authorization: 'Token abc' } }, res, () => { next = true; });
        expect(res.code).toBe(401);
        expect(next).toBe(false);
    });

    it('passa e popula usuario/papel com token válido', () => {
        const res = makeRes();
        let next = false;
        const token = jwt.sign({ id: 'abc', papel: 'admin' }, 'test-secret');
        const req = { headers: { authorization: `Bearer ${token}` } };

        authMiddleware(req, res, () => { next = true; });

        expect(next).toBe(true);
        expect(req.usuario).toBe('abc');
        expect(req.usuarioPapel).toBe('admin');
    });

    it('retorna 401 com assinatura inválida', () => {
        const res = makeRes();
        let next = false;
        const bad = jwt.sign({ id: 'x' }, 'outra-chave');
        authMiddleware({ headers: { authorization: `Bearer ${bad}` } }, res, () => { next = true; });
        expect(res.code).toBe(401);
        expect(next).toBe(false);
    });
});
