import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ModalGenerico } from '@/components/modal/ModalGenerico';
import { turmaSchema } from '@/shared/schemas/turmaSchema';
import { DIAS_SEMANA } from '@/shared/constants';

const DIAS_VALUES = DIAS_SEMANA.map(d => d.value);

export function TurmasModal({ aberto = false, onFechar, onSalvar, turmaSelecionada, professores = [] }) {
  const isEdicao = !!turmaSelecionada?._id;

  const professorOptions = useMemo(
    () => professores.map(p => ({ value: p._id, label: p.nome })),
    [professores]
  );

  const fields = useMemo(() => [
    { name: 'nome', label: 'Nome', placeholder: 'Ex: Judô Infantil' },
    { name: 'capacidadeMaxima', label: 'Capacidade máxima', type: 'number', placeholder: 'Ex: 20' },
    { name: 'horarioInicio', label: 'Início', type: 'time' },
    { name: 'horarioFim', label: 'Término', type: 'time' },
    { name: 'dias', label: 'Dias da semana', type: 'multiselect', options: DIAS_SEMANA, size: 7 },
    { name: 'professorResponsavel', label: 'Professores responsáveis', type: 'multiselect', options: professorOptions, size: 4 },
    { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Opcional' },
  ], [professorOptions]);

  const defaultValues = useMemo(() => isEdicao
    ? {
        nome: turmaSelecionada.nome ?? '',
        capacidadeMaxima: turmaSelecionada.capacidadeMaxima ?? '',
        horarioInicio: turmaSelecionada.programacao?.horarioInicio ?? '',
        horarioFim: turmaSelecionada.programacao?.horarioFim ?? '',
        dias: DIAS_VALUES.filter(d => turmaSelecionada.programacao?.dias?.[d]),
        professorResponsavel: (turmaSelecionada.professorResponsavel ?? []).map(p => (typeof p === 'string' ? p : p._id)),
        descricao: turmaSelecionada.descricao ?? '',
      }
    : { nome: '', capacidadeMaxima: '', horarioInicio: '', horarioFim: '', dias: [], professorResponsavel: [], descricao: '' },
  [isEdicao, turmaSelecionada]);

  if (!aberto) return null;

  return (
    <ModalGenerico
      aberto={aberto}
      onFechar={onFechar}
      onSalvar={onSalvar}
      titulo={isEdicao ? 'Editar Turma' : 'Nova Turma'}
      submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
      fields={fields}
      schema={turmaSchema}
      defaultValues={defaultValues}
    />
  );
}

TurmasModal.propTypes = {
  aberto: PropTypes.bool,
  onFechar: PropTypes.func,
  onSalvar: PropTypes.func,
  professores: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, nome: PropTypes.string })),
  turmaSelecionada: PropTypes.shape({
    _id: PropTypes.string,
    nome: PropTypes.string,
    capacidadeMaxima: PropTypes.number,
    descricao: PropTypes.string,
    professorResponsavel: PropTypes.array,
    programacao: PropTypes.shape({
      horarioInicio: PropTypes.string,
      horarioFim: PropTypes.string,
      dias: PropTypes.object,
    }),
  }),
};
