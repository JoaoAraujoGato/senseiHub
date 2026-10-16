import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ModalGenerico } from '@/components/modal/ModalGenerico';
import { faixaSchema } from '@/shared/schemas/faixaSchema';

const FAIXA_FIELDS = [
  {
    name: 'nome',
    label: 'Nome',
    placeholder: 'Ex: Azul',
  },
  {
    name: 'ordem',
    label: 'Ordem',
    placeholder: 'Ex: 3',
  },
  {
    name: 'corPrincipalHex',
    label: 'Cor Principal',
    type: 'color',
    row: 'cores',
    style: { flex: 1 },
  },
  {
    name: 'corSecundariaHex',
    label: 'Cor Secundária (opcional)',
    type: 'color',
    row: 'cores',
    optional: true,
    style: { flex: 1 },
  },
];

const DEFAULT_VALUES = { nome: '', ordem: '', corPrincipalHex: '#000000', corSecundariaHex: '#000000' };

export function FaixaModal({ aberto = false, onFechar, onSalvar, faixaSelecionada }) {
  const isEdicao = !!faixaSelecionada?.nome;

  const defaultValues = useMemo(() => isEdicao
    ? {
        nome:             faixaSelecionada.nome,
        ordem:            faixaSelecionada.ordem,
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
      schema={faixaSchema}
      defaultValues={defaultValues}
    />
  );
}

FaixaModal.propTypes = {
  aberto:            PropTypes.bool,
  onFechar:          PropTypes.func,
  onSalvar:          PropTypes.func,
  faixaSelecionada:  PropTypes.shape({
    nome:             PropTypes.string,
    ordem:            PropTypes.number,
    corPrincipalHex:  PropTypes.string,
    corSecundariaHex: PropTypes.string,
  }),
};
