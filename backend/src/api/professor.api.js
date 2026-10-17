import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import professorModel from '../models/Professor.model.js';
import turmaModel from '../models/Turma.model.js';
import { QUERY_MODES } from '../utils/query.utils.js';
import apiFactory from './factory/api.factory.js';

const baseCrud = apiFactory(professorModel, ENTITY_INFO.ENTITY_INFO_PROFESSOR.MODEL_NAME, {
    afterCreate: (doc) => delete doc._doc.senha,
    textFields: [ 'nome', 'email' ],
    queryMode: QUERY_MODES.PARTIAL,
});

const getByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const professor = await professorModel.findOne({ email });

        if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });

        res.status(200).json(professor);
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Falha ao recuperar professor' });
    }
};

const deactivate = async (req, res) => {
    const { id } = req.params;
    try {
        const professor = await professorModel.findByIdAndUpdate(id, { ativo: false }, { new: true });

        res.status(200).json({ message: 'Professor desativado com sucesso', professor });
    } catch (err) {
        res.status(400).json({ error: err.message, message: 'Falha ao desativar professor' });
    }
};

// Exclui o professor e limpa as referências (remove de todas as turmas).
const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await turmaModel.updateMany(
            { professorResponsavel: id },
            { $pull: { professorResponsavel: id } }
        );
        await professorModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Professor excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message, message: 'Falha ao excluir professor' });
    }
};

export default {
    ...baseCrud,
    getByEmail,
    deactivate,
    deleteById,
};
