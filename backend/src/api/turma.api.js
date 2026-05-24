import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import turmaModel from '../models/Turma.model.js';
import { QUERY_MODES } from '../utils/query.utils.js';
import apiFactory from './factory/api.factory.js';

const baseCrud = apiFactory(turmaModel, ENTITY_INFO.ENTITY_INFO_TURMA.MODEL_NAME, {
    textFields: [ 'nome' ],
    queryMode: QUERY_MODES.PARTIAL,  
});

const customMethods = {
    getByProfessor: async (req, res) => {
        const { professorId } = req.params;
        try {
            const turmas = await turmaModel
                .find({ professorResponsavel: professorId })
                .populate('professorResponsavel');

            if (!turmas.length) {
                return res.status(404).json({ message: 'Nenhuma turma encontrada para esse professor' });
            }

            res.status(200).json(turmas);
        } catch (err) {
            res.status(500).json({ error: err.message, message: 'Falha ao buscar turmas do professor' });
        }
    },
};

export default {...baseCrud, ...customMethods};