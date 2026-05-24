import { normalizeFilters, QUERY_MODES } from '../../utils/query.utils.js';
import { isEmptyLike } from 'js-var-type';

/**
 * Factory que gera um conjunto de controllers CRUD padrão para uma entidade.
 * Os métodos gerados podem ser estendidos ou sobrescritos no controller de cada entidade.
 *
 * @param {mongoose.Model} model - Model do Mongoose da entidade.
 * @param {string} entityName - Nome da entidade (ex: 'Professor', 'Faixa').
 *
 * @param {Object} options - Opções de configuração.
 * @param {string} [options.entityKey] - Chave usada em req[entityKey] no getById.
 *                                       Deriva automaticamente do entityName em lowercase.
 *                                       Ex: 'Professor' → req.professor
 * @param {Object} [options.messages] - Mensagens customizadas para cada operação.
 *                                      Campos: created, createFail, notFound, queryFail,
 *                                      getAllFail, getByIdFail, noData, updated, updateFail,
 *                                      deleted, deleteFail.
 * @param {Function|null} [options.afterCreate] - Hook executado após o save() no create.
 *                                                Recebe o documento salvo como argumento.
 *                                                Ex: (doc) => delete doc._doc.senha
 * @param {string[]} [options.textFields] - Campos de texto que serão normalizados na query
 *                                          (case/accent insensitive via regex).
 *                                          Campos fora desta lista são filtrados literalmente.
 *                                          Ex: ['nome', 'categoria']
 * @param {string} [options.queryMode] - Modo padrão de busca para os textFields.
 *                                       Use QUERY_MODES.EXACT (padrão) para busca exata
 *                                       ou QUERY_MODES.PARTIAL para busca por trecho.
 *                                       Pode ser sobrescrito por request via body: { mode }
 *
 * @returns {{ create, query, getAll, getById, update, deleteById }} Controllers da entidade.
*/
const apiFactory = (model, entityName, options = {}) => {
    const {
        entityKey = entityName.toLowerCase(),   // 'professor' → req.professor
        messages = {},
        afterCreate = null,   // hook para pós-criação (ex: deletar senha)
        textFields = [],              // 👈 campos de texto que aceitam filtro
        queryMode = QUERY_MODES.EXACT // 👈 modo padrão da entidade
    } = options;

    const create = async (req, res) => {
        const data = req.body;
        try {
            const doc = await new model(data).save();

            if (afterCreate) afterCreate(doc);

            res.status(201).json({ message: messages.created ?? `${entityName} criado com sucesso`, [entityKey]: doc });
        } catch (err) {
            res.status(400).json({ error: err.message, message: messages.createFail ?? `Falha ao criar ${entityName}` });
        }
    };

    const query = async (req, res, next) => {       // 👈 vira middleware também
        const { mode, ...filtros } = req.body;

        const activeMode = mode ?? queryMode;
        try {
            req.filtros = normalizeFilters(filtros, textFields, activeMode);  // 👈 popula req.filtros
            next();                                                            // 👈 passa pro pagination
        } catch (err) {
            res.status(500).json({ error: err.message, message: messages.queryFail ?? `Falha ao recuperar ${entityName}` });
        }
    };

    const getAll = async (req, res) => {
        res.status(200).json(req.paginatedResults);
    };

    const getById = async (req, res) => {
        try {
            res.status(200).json(req[entityKey]);
        } catch (err) {
            res.status(500).json({ error: err.message, message: messages.getByIdFail ?? `Falha ao recuperar ${entityName}` });
        }
    };

    const update = async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (isEmptyLike(data)) {
            return res.status(400).json({ message: messages.noData ?? 'Nenhum dado fornecido para atualização' });
        }

        try {
            const doc = await model.findByIdAndUpdate(id, data, { new: true });
            res.status(200).json({ message: messages.updated ?? `${entityName} atualizado com sucesso`, [entityKey]: doc });
        } catch (err) {
            res.status(400).json({ error: err.message, message: messages.updateFail ?? `Falha ao atualizar ${entityName}` });
        }
    };

    const deleteById = async (req, res) => {
        const { id } = req.params;

        try {
            await model.findByIdAndDelete(id);
            res.status(200).json({ message: messages.deleted ?? `${entityName} deletado com sucesso` });
        } catch (err) {
            res.status(400).json({ error: err.message, message: messages.deleteFail ?? `Falha ao deletar ${entityName}` });
        }
    };

    const respond = (req, res) => {
        res.status(200).json(req.paginatedResults);
    };

    return { create, query, getAll, getById, update, deleteById, respond };
};

export default apiFactory;