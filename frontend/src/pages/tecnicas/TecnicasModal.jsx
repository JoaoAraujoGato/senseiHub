import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ModalGenerico } from '@/components/modal/ModalGenerico';
import { tecnicaSchema } from '@/shared/schemas/tecnicaSchema';

const TECNICA_FIELDS = [
  { name: 'nome', label: 'Nome', placeholder: 'Ex: O Soto Gari' },
  { name: 'nomeTraduzido', label: 'Nome traduzido', placeholder: 'Ex: Grande Rasteira Externa' },
  { name: 'categoria', label: 'Categoria', placeholder: 'Ex: Nage Waza' },
  { name: 'subCategoria', label: 'Subcategoria', placeholder: 'Ex: Ashi Waza' },
  { name: 'videoUrl', label: 'Vídeo (URL)', placeholder: 'https://youtube.com/...' },
  { name: 'descricao', label: 'Descrição', placeholder: 'Opcional' },
];

export function TecnicasModal({ aberto = false, onFechar, onSalvar, tecnicaSelecionada }) {
  const isEdicao = !!tecnicaSelecionada?._id;

  const defaultValues = useMemo(() => isEdicao
    ? {
        nome: tecnicaSelecionada.nome ?? '',
        nomeTraduzido: tecnicaSelecionada.nomeTraduzido ?? '',
        categoria: tecnicaSelecionada.categoria ?? '',
        subCategoria: tecnicaSelecionada.subCategoria ?? '',
        videoUrl: tecnicaSelecionada.videoUrl ?? '',
        descricao: tecnicaSelecionada.descricao ?? '',
      }
    : { nome: '', nomeTraduzido: '', categoria: '', subCategoria: '', videoUrl: '', descricao: '' },
  [isEdicao, tecnicaSelecionada]);

  if (!aberto) return null;

  return (
    <ModalGenerico
      aberto={aberto}
      onFechar={onFechar}
      onSalvar={onSalvar}
      titulo={isEdicao ? 'Editar Técnica' : 'Nova Técnica'}
      submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
      fields={TECNICA_FIELDS}
      schema={tecnicaSchema}
      defaultValues={defaultValues}
    />
  );
}

TecnicasModal.propTypes = {
  aberto: PropTypes.bool,
  onFechar: PropTypes.func,
  onSalvar: PropTypes.func,
  tecnicaSelecionada: PropTypes.shape({
    _id: PropTypes.string,
    nome: PropTypes.string,
    nomeTraduzido: PropTypes.string,
    categoria: PropTypes.string,
    subCategoria: PropTypes.string,
    videoUrl: PropTypes.string,
    descricao: PropTypes.string,
  }),
};
