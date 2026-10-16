import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ModalGenerico } from '@/components/modal/ModalGenerico';
import { atletaSchema } from '@/shared/schemas/atletaSchema';
import { GENERO_OPTIONS, STATUS_ATLETA_OPTIONS } from '@/shared/constants';

export function AtletasModal({ aberto = false, onFechar, onSalvar, atletaSelecionado, faixas = [], turmas = [] }) {
  const isEdicao = !!atletaSelecionado?._id;

  const faixaOptions = useMemo(() => faixas.map(f => ({ value: f._id, label: f.nome })), [faixas]);
  const turmaOptions = useMemo(() => turmas.map(t => ({ value: t._id, label: t.nome })), [turmas]);

  const fields = useMemo(() => [
    { name: 'nome', label: 'Nome', placeholder: 'Ex: Lucas Silva' },
    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'Opcional' },
    { name: 'dataNascimento', label: 'Data de nascimento', type: 'date' },
    { name: 'genero', label: 'Gênero', type: 'select', options: GENERO_OPTIONS },
    { name: 'peso', label: 'Peso', placeholder: 'Ex: 70kg' },
    { name: 'faixa', label: 'Faixa', type: 'select', options: faixaOptions },
    { name: 'turmas', label: 'Turmas', type: 'multiselect', options: turmaOptions, size: 4 },
    { name: 'status', label: 'Status', type: 'select', options: STATUS_ATLETA_OPTIONS },
    { name: 'descricaoMedica', label: 'Observações médicas', type: 'textarea', placeholder: 'Opcional' },
  ], [faixaOptions, turmaOptions]);

  const defaultValues = useMemo(() => isEdicao
    ? {
        nome: atletaSelecionado.nome ?? '',
        email: atletaSelecionado.email ?? '',
        dataNascimento: atletaSelecionado.dataNascimento?.slice(0, 10) ?? '',
        genero: atletaSelecionado.genero ?? '',
        peso: atletaSelecionado.peso ?? '',
        faixa: atletaSelecionado.faixa ?? '',
        turmas: (atletaSelecionado.turmas ?? []).map(t => (typeof t === 'string' ? t : t._id)),
        status: atletaSelecionado.status ?? 'ativo',
        descricaoMedica: atletaSelecionado.descricaoMedica ?? '',
      }
    : { nome: '', email: '', dataNascimento: '', genero: '', peso: '', faixa: '', turmas: [], status: 'ativo', descricaoMedica: '' },
  [isEdicao, atletaSelecionado]);

  if (!aberto) return null;

  return (
    <ModalGenerico
      aberto={aberto}
      onFechar={onFechar}
      onSalvar={onSalvar}
      titulo={isEdicao ? 'Editar Atleta' : 'Novo Atleta'}
      submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
      fields={fields}
      schema={atletaSchema}
      defaultValues={defaultValues}
    />
  );
}

AtletasModal.propTypes = {
  aberto: PropTypes.bool,
  onFechar: PropTypes.func,
  onSalvar: PropTypes.func,
  faixas: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, nome: PropTypes.string })),
  turmas: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, nome: PropTypes.string })),
  atletaSelecionado: PropTypes.shape({
    _id: PropTypes.string,
    nome: PropTypes.string,
    email: PropTypes.string,
    dataNascimento: PropTypes.string,
    genero: PropTypes.string,
    peso: PropTypes.string,
    faixa: PropTypes.string,
    turmas: PropTypes.array,
    status: PropTypes.string,
    descricaoMedica: PropTypes.string,
  }),
};
