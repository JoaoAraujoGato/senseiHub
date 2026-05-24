import mongoose from 'mongoose';
import { parseSortQuery } from '../utils/sort.utils.js';

export const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Object ID inválido' });
    }

    next();
};

export const validEntity = (model, entityName) => {
    return async (req, res, next) => {
        const { id } = req.params;

        try {
            const entity = await model.findById(id);

            if (!entity) {
                return res.status(404).json({ message: `${entityName} não encontrado(a)` });
            }

            req.id = id;
            req[entityName.toLowerCase()] = entity;

            next();
        } catch (err) {
            res.status(500).json({ error: err.message, message: `Falha ao recuperar ${entityName}` });
        }
    };
};

export const pagination = (model, sortOptions = {}) => {
    return async (req, res, next) => {
        const { page = 1, limit = 10 } = req.query;

        const sort = req.query.sort
            ? parseSortQuery(req.query.sort)
            : sortOptions;

        // filtros podem vir do req.filtros (populado pelo controller) ou vazio
        const filtros = req.filtros ?? {};

        try {
            const total = await model.countDocuments(filtros);  // 👈 conta só os filtrados
            const currentUrl = req.baseUrl;

            const results = await model
                .find(filtros)                                   // 👈 aplica os filtros
                .sort(sort)
                .limit(limit * 1)
                .skip((page - 1) * limit);

            if (results.length === 0) {
                return res.status(404).json({ message: 'Nenhum resultado encontrado' });
            }

            const nextUrl = page * limit < total
                ? `${currentUrl}?page=${parseInt(page) + 1}&limit=${limit}`
                : null;
            const prevUrl = page > 1
                ? `${currentUrl}?page=${parseInt(page) - 1}&limit=${limit}`
                : null;

            req.paginatedResults = { nextUrl, prevUrl, total, page, limit, results };

            next();
        } catch (err) {
            res.status(500).json({ error: err.message, message: 'Falha ao paginar resultados' });
        }
    };
};