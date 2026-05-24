import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import atletaModel from '../models/Atleta.model.js';
import { QUERY_MODES } from '../utils/query.utils.js';
import apiFactory from './factory/api.factory.js';

const baseCrud = apiFactory(atletaModel, ENTITY_INFO.ENTITY_INFO_ATLETA.MODEL_NAME, {
    textFields: [ 'nome', 'email' ],
    queryMode: QUERY_MODES.PARTIAL,  
});

const customMethods = {
    getByTurma: async (req, res) => {
        const { turmaId } = req.params;
        try {
            const atletas = await atletaModel
                .find({ turmas: turmaId })
                .populate('faixa')
                .populate('turmas');

            if (!atletas.length) {
                return res.status(404).json({ message: 'Nenhum atleta encontrado nessa turma' });
            }

            res.status(200).json(atletas);
        } catch (err) {
            res.status(500).json({ error: err.message, message: 'Falha ao buscar atletas da turma' });
        }
    },
    getByFaixa: async (req, res) => {
        const { faixaId } = req.params;
        try {
            const atletas = await atletaModel
                .find({ faixa: faixaId })
                .populate('faixa');

            if (!atletas.length) {
                return res.status(404).json({ message: 'Nenhum atleta encontrado nessa faixa' });
            }

            res.status(200).json(atletas);
        } catch (err) {
            res.status(500).json({ error: err.message, message: 'Falha ao buscar atletas da faixa' });
        }
    },
};

export default {...baseCrud, ...customMethods};