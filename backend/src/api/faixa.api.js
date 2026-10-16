import { ENTITY_INFO } from '../../regras-negocio/constantes/entities-info.js';
import faixaModel from '../models/Faixa.model.js';
import { QUERY_MODES } from '../utils/query.utils.js';
import apiFactory from './factory/api.factory.js';

const baseCrud = apiFactory(faixaModel, ENTITY_INFO.ENTITY_INFO_FAIXA.MODEL_NAME, {
    textFields: [ 'nome' ],
    queryMode: QUERY_MODES.PARTIAL,
    messages: {
        created: 'Faixa criada com sucesso',
        createFail: 'Falha ao criar faixa',
        updated: 'Faixa atualizada com sucesso',
        updateFail: 'Falha ao atualizar faixa',
        duplicate: 'Já existe uma faixa com esse nome',
    },
});

// Excluir faixa é inativar (soft delete), para não quebrar referências de atletas/professores.
const deleteById = async (req, res) => {
    const { id } = req.params;

    try {
        const faixa = await faixaModel.findByIdAndUpdate(id, { status: false }, { new: true });
        res.status(200).json({ message: 'Faixa inativada com sucesso', faixa });
    } catch (err) {
        res.status(400).json({ error: err.message, message: 'Falha ao inativar Faixa' });
    }
};

export default { ...baseCrud, deleteById };
