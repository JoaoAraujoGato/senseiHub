import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { FormBase } from '@/components/form/FormBase';
import { FormCard } from '@/components/form/FormStyles';
import { professorSchema } from '@/shared/schemas/professorSchema';
import { PAPEL_OPTIONS, GENERO_OPTIONS } from '@/shared/constants';
import {
    useGetProfessorQuery,
    useCreateProfessorMutation,
    useUpdateProfessorMutation,
} from '@/features/professor/professorApi';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';

export function ProfessorFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdicao = Boolean(id);

    const { data: professor } = useGetProfessorQuery(id, { skip: !isEdicao });
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });
    const [criarProfessor] = useCreateProfessorMutation();
    const [atualizarProfessor] = useUpdateProfessorMutation();

    const schema = useMemo(() => professorSchema(isEdicao), [isEdicao]);

    const faixaOptions = useMemo(
        () => (faixaData?.results ?? []).map(f => ({ value: f._id, label: f.nome })),
        [faixaData]
    );

    const fields = useMemo(() => [
        { section: 'Dados pessoais', name: 'nome', label: 'Nome', placeholder: 'Ex: Carlos Henrique' },
        { section: 'Dados pessoais', name: 'email', label: 'E-mail', type: 'email', placeholder: 'sensei@dojo.com' },
        {
            section: 'Dados pessoais',
            name: 'senha',
            label: isEdicao ? 'Senha (deixe vazio para manter)' : 'Senha',
            type: 'password',
            placeholder: 'mínimo 6 caracteres',
        },
        { section: 'Dados pessoais', name: 'numeroContato', label: 'Contato', placeholder: '(11) 99999-0000' },
        { section: 'Dados pessoais', name: 'faixa', label: 'Faixa', type: 'combobox', options: faixaOptions, placeholder: 'Buscar faixa...' },
        { section: 'Dados pessoais', name: 'papel', label: 'Papel', type: 'select', options: PAPEL_OPTIONS },
        { section: 'Dados pessoais', name: 'genero', label: 'Gênero', type: 'select', options: GENERO_OPTIONS },
    ], [isEdicao, faixaOptions]);

    const defaultValues = useMemo(() => (isEdicao && professor)
        ? {
            nome: professor.nome ?? '',
            email: professor.email ?? '',
            senha: '',
            numeroContato: professor.numeroContato ?? '',
            papel: professor.papel ?? '',
            genero: professor.genero ?? '',
            faixa: professor.faixa ?? '',
        }
        : { nome: '', email: '', senha: '', numeroContato: '', faixa: '', papel: '', genero: '' },
    [isEdicao, professor]);

    const salvar = async (dados) => {
        const limpos = Object.fromEntries(Object.entries(dados).filter(([, v]) => v !== '' && v !== undefined));
        try {
            if (isEdicao) {
                await atualizarProfessor({ id, ...limpos }).unwrap();
                navigate(`/professores/${id}`);
            } else {
                const res = await criarProfessor(limpos).unwrap();
                navigate(`/professores/${res.professor?._id}`);
            }
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar professor');
        }
    };

    if (isEdicao && !professor) {
        return <PageContainer><Spinner label="Carregando professor..." /></PageContainer>;
    }

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>{isEdicao ? 'Editar Professor' : 'Novo Professor'}</h1>
                    <p>{isEdicao ? 'Atualize os dados do professor' : 'Cadastre um novo professor'}</p>
                </TitleGroup>
                <Button
                    variant="ghost"
                    icon={<MdArrowBack size={16} />}
                    onClick={() => navigate(isEdicao ? `/professores/${id}` : '/professores')}
                >
                    Voltar
                </Button>
            </PageHeader>

            <FormCard>
                <FormBase
                    fields={fields}
                    schema={schema}
                    defaultValues={defaultValues}
                    onSubmit={salvar}
                    onCancel={() => navigate(isEdicao ? `/professores/${id}` : '/professores')}
                    submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
                />
            </FormCard>
        </PageContainer>
    );
}
