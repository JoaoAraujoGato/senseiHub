import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ModalGenerico } from '../../components/modal/ModalGenerico';

const FAIXA_FIELDS = [
  {
    name: 'nome',
    label: 'Nome',
    placeholder: 'Ex: Azul',
    rules: { required: 'Nome é obrigatório' },
  },
  {
    name: 'ordem',
    label: 'Ordem',
    placeholder: 'Ex: 3',
    rules: { required: 'Ordem é obrigatória' },
  },
  {
    name: 'corPrincipalHex',
    label: 'Cor Principal',
    type: 'color',
    row: 'cores',
    style: { flex: 1 },
    rules: { required: 'Obrigatório' },
  },
  {
    name: 'corSecundariaHex',
    label: 'Cor Secundária (opcional)',
    type: 'color',
    row: 'cores',
    style: { flex: 1 },
  },
];

const DEFAULT_VALUES = { nome: '', corPrincipalHex: '#000000', corSecundariaHex: '#000000' };

export function FaixaModal({ aberto, onFechar, onSalvar, faixaSelecionada }) {
  const isEdicao = !!faixaSelecionada?.nome;

  const defaultValues = useMemo(() => isEdicao
    ? {
        nome:             faixaSelecionada.nome,
        corPrincipalHex:  faixaSelecionada.corPrincipalHex,
        corSecundariaHex: faixaSelecionada.corSecundariaHex ?? '#000000',
      }
    : DEFAULT_VALUES,
  [isEdicao, faixaSelecionada]);

  if (!aberto) return null;

  return (
    <ModalGenerico
      aberto={aberto}
      onFechar={onFechar}
      onSalvar={onSalvar}
      titulo={isEdicao ? 'Editar Faixa' : 'Nova Faixa'}
      submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
      fields={FAIXA_FIELDS}
      defaultValues={defaultValues}
      colorPreview  // 👈 nova prop que ativa o efeito
    />
  );
}

FaixaModal.defaultProps = {
  aberto: false,
  onFechar: () => {},
  onSalvar: () => {},
  faixaSelecionada: null,   // null é mais semântico que {} para "nenhum"
};

FaixaModal.propTypes = {
  aberto:            PropTypes.bool,
  onFechar:          PropTypes.func,
  onSalvar:          PropTypes.func,
  faixaSelecionada:  PropTypes.shape({
    nome:             PropTypes.string,
    corPrincipalHex:  PropTypes.string,
    corSecundariaHex: PropTypes.string,
  }),
};