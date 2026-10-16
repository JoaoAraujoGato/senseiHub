import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ModalGenerico } from '@/components/modal/ModalGenerico';
import { professorSchema } from '@/shared/schemas/professorSchema';
import { PAPEL_OPTIONS, GENERO_OPTIONS } from '@/shared/constants';

export function ProfessoresModal({ aberto = false, onFechar, onSalvar, professorSelecionado }) {
  const isEdicao = !!professorSelecionado?._id;

  const schema = useMemo(() => professorSchema(isEdicao), [isEdicao]);

  const fields = useMemo(() => [
    { name: 'nome', label: 'Nome', placeholder: 'Ex: Carlos Henrique' },
    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'sensei@dojo.com' },
    {
      name: 'senha',
      label: isEdicao ? 'Senha (deixe vazio para manter)' : 'Senha',
      type: 'password',
      placeholder: 'mínimo 6 caracteres',
    },
    { name: 'numeroContato', label: 'Contato', placeholder: '(11) 99999-0000' },
    { name: 'papel', label: 'Papel', type: 'select', options: PAPEL_OPTIONS },
    { name: 'genero', label: 'Gênero', type: 'select', options: GENERO_OPTIONS },
  ], [isEdicao]);

  const defaultValues = useMemo(() => isEdicao
    ? {
        nome: professorSelecionado.nome ?? '',
        email: professorSelecionado.email ?? '',
        senha: '',
        numeroContato: professorSelecionado.numeroContato ?? '',
        papel: professorSelecionado.papel ?? '',
        genero: professorSelecionado.genero ?? '',
      }
    : { nome: '', email: '', senha: '', numeroContato: '', papel: '', genero: '' },
  [isEdicao, professorSelecionado]);

  if (!aberto) return null;

  return (
    <ModalGenerico
      aberto={aberto}
      onFechar={onFechar}
      onSalvar={onSalvar}
      titulo={isEdicao ? 'Editar Professor' : 'Novo Professor'}
      submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
      fields={fields}
      schema={schema}
      defaultValues={defaultValues}
    />
  );
}

ProfessoresModal.propTypes = {
  aberto: PropTypes.bool,
  onFechar: PropTypes.func,
  onSalvar: PropTypes.func,
  professorSelecionado: PropTypes.shape({
    _id: PropTypes.string,
    nome: PropTypes.string,
    email: PropTypes.string,
    numeroContato: PropTypes.string,
    papel: PropTypes.string,
    genero: PropTypes.string,
  }),
};
