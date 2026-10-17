import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { FormBase } from '@/components/form/FormBase';
import { FormCard } from '@/components/form/FormStyles';
import { atletaSchema } from '@/shared/schemas/atletaSchema';
import { GENERO_OPTIONS, STATUS_ATLETA_OPTIONS, RELACAO_OPTIONS } from '@/shared/constants';
import { isMenorDeIdade } from '@/shared/idade';
import {
    useGetAtletaQuery,
    useCreateAtletaMutation,
    useUpdateAtletaMutation,
} from '@/features/atleta/atletaApi';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';
import { useGetTurmasQuery } from '@/features/turma/turmaApi';

const ehMenor = (v) => Boolean(v.dataNascimento) && isMenorDeIdade(v.dataNascimento);
const ehMaior = (v) => Boolean(v.dataNascimento) && !isMenorDeIdade(v.dataNascimento);
const ehOutroParentesco = (v) => ehMaior(v) && v.emergenciaParentesco === 'outro';

const VAZIO = {
    nome: '', email: '', dataNascimento: '', genero: '', peso: '', faixa: '', turmas: [],
    status: 'ativo', alergias: '', observacoes: '',
    nomeMae: '', contatoMae: '', nomePai: '', contatoPai: '',
    emergenciaNome: '', emergenciaParentesco: '', emergenciaParentescoOutro: '', emergenciaContato: '',
};

export function AtletaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdicao = Boolean(id);

    const { data: atleta } = useGetAtletaQuery(id, { skip: !isEdicao });
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });
    const { data: turmaData } = useGetTurmasQuery({ limit: 100 });
    const [criarAtleta] = useCreateAtletaMutation();
    const [atualizarAtleta] = useUpdateAtletaMutation();

    const faixaOptions = useMemo(() => (faixaData?.results ?? []).map(f => ({ value: f._id, label: f.nome })), [faixaData]);
    const turmaOptions = useMemo(() => (turmaData?.results ?? []).map(t => ({ value: t._id, label: t.nome })), [turmaData]);

    const fields = useMemo(() => [
        { section: 'Dados pessoais', name: 'nome', label: 'Nome', placeholder: 'Ex: Lucas Silva' },
        { section: 'Dados pessoais', name: 'email', label: 'E-mail', type: 'email', placeholder: 'Opcional' },
        { section: 'Dados pessoais', name: 'dataNascimento', label: 'Data de nascimento', type: 'date' },
        { section: 'Dados pessoais', name: 'genero', label: 'Gênero', type: 'select', options: GENERO_OPTIONS },
        { section: 'Dados pessoais', name: 'peso', label: 'Peso', placeholder: 'Ex: 70kg' },
        { section: 'Dados pessoais', name: 'faixa', label: 'Faixa', type: 'combobox', options: faixaOptions, placeholder: 'Buscar faixa...' },
        { section: 'Dados pessoais', name: 'turmas', label: 'Turmas', type: 'multiselect', options: turmaOptions, placeholder: 'Selecione as turmas' },
        { section: 'Dados pessoais', name: 'status', label: 'Status', type: 'select', options: STATUS_ATLETA_OPTIONS },

        // Menor de idade → responsáveis
        { section: 'Responsáveis', row: 'mae', name: 'nomeMae', label: 'Nome da mãe', placeholder: 'Opcional', when: ehMenor },
        { section: 'Responsáveis', row: 'mae', name: 'contatoMae', label: 'Contato da mãe', placeholder: '(11) 99999-0000', when: ehMenor },
        { section: 'Responsáveis', row: 'pai', name: 'nomePai', label: 'Nome do pai', placeholder: 'Opcional', when: ehMenor },
        { section: 'Responsáveis', row: 'pai', name: 'contatoPai', label: 'Contato do pai', placeholder: '(11) 99999-0000', when: ehMenor },

        // Maior de idade → contato de emergência
        { section: 'Contato de emergência', row: 'emergencia', name: 'emergenciaNome', label: 'Nome', placeholder: 'Nome do contato', when: ehMaior },
        { section: 'Contato de emergência', row: 'emergencia', name: 'emergenciaParentesco', label: 'Relação', type: 'select', options: RELACAO_OPTIONS, when: ehMaior },
        { section: 'Contato de emergência', row: 'emergencia', name: 'emergenciaParentescoOutro', label: 'Especifique a relação', placeholder: 'Ex: Padrinho', when: ehOutroParentesco },
        { section: 'Contato de emergência', row: 'emergencia', name: 'emergenciaContato', label: 'Telefone', placeholder: '(11) 99999-0000', when: ehMaior },

        // Saúde / apoio
        { section: 'Saúde e apoio', name: 'alergias', label: 'Alergias', placeholder: 'Ex: nenhuma / amendoim' },
        { section: 'Saúde e apoio', name: 'observacoes', label: 'Observações (saúde, apoio, alergias…)', type: 'textarea', placeholder: 'Opcional' },
    ], [faixaOptions, turmaOptions]);

    const defaultValues = useMemo(() => {
        if (isEdicao && atleta) {
            const resp = atleta.responsaveis ?? [];
            const mae = resp.find(r => r.parentesco === 'mae') ?? {};
            const pai = resp.find(r => r.parentesco === 'pai') ?? {};
            const ce = atleta.contatoEmergencia ?? {};
            return {
                ...VAZIO,
                nome: atleta.nome ?? '',
                email: atleta.email ?? '',
                dataNascimento: atleta.dataNascimento?.slice(0, 10) ?? '',
                genero: atleta.genero ?? '',
                peso: atleta.peso ?? '',
                faixa: atleta.faixa ?? '',
                turmas: (atleta.turmas ?? []).map(t => (typeof t === 'string' ? t : t._id)),
                status: atleta.status ?? 'ativo',
                alergias: atleta.alergias ?? '',
                observacoes: atleta.observacoes ?? '',
                nomeMae: mae.nome ?? '', contatoMae: mae.contato ?? '',
                nomePai: pai.nome ?? '', contatoPai: pai.contato ?? '',
                emergenciaNome: ce.nome ?? '', emergenciaParentesco: ce.parentesco ?? '',
                emergenciaParentescoOutro: ce.parentescoOutro ?? '', emergenciaContato: ce.contato ?? '',
            };
        }
        return VAZIO;
    }, [isEdicao, atleta]);

    const montarPayload = (dados) => {
        const {
            nomeMae, contatoMae, nomePai, contatoPai,
            emergenciaNome, emergenciaParentesco, emergenciaParentescoOutro, emergenciaContato,
            ...resto
        } = dados;

        const menor = isMenorDeIdade(resto.dataNascimento);

        if (menor) {
            const responsaveis = [];
            if (nomeMae || contatoMae) responsaveis.push({ nome: nomeMae || '', contato: contatoMae || '', parentesco: 'mae' });
            if (nomePai || contatoPai) responsaveis.push({ nome: nomePai || '', contato: contatoPai || '', parentesco: 'pai' });
            resto.responsaveis = responsaveis;
        } else {
            resto.responsaveis = [];
            if (emergenciaNome || emergenciaContato || emergenciaParentesco) {
                resto.contatoEmergencia = {
                    nome: emergenciaNome || '',
                    parentesco: emergenciaParentesco || '',
                    parentescoOutro: emergenciaParentesco === 'outro' ? (emergenciaParentescoOutro || '') : '',
                    contato: emergenciaContato || '',
                };
            }
        }

        return Object.fromEntries(Object.entries(resto).filter(([, v]) => v !== '' && v !== undefined));
    };

    const salvar = async (dados) => {
        const payload = montarPayload(dados);
        try {
            if (isEdicao) {
                await atualizarAtleta({ id, ...payload }).unwrap();
                navigate(`/atletas/${id}`);
            } else {
                const res = await criarAtleta(payload).unwrap();
                navigate(`/atletas/${res.atleta?._id}`);
            }
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar atleta');
        }
    };

    if (isEdicao && !atleta) {
        return <PageContainer><Spinner label="Carregando atleta..." /></PageContainer>;
    }

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>{isEdicao ? 'Editar Atleta' : 'Novo Atleta'}</h1>
                    <p>{isEdicao ? 'Atualize os dados do atleta' : 'Cadastre um novo atleta'}</p>
                </TitleGroup>
                <Button
                    variant="ghost"
                    icon={<MdArrowBack size={16} />}
                    onClick={() => navigate(isEdicao ? `/atletas/${id}` : '/atletas')}
                >
                    Voltar
                </Button>
            </PageHeader>

            <FormCard>
                <FormBase
                    fields={fields}
                    schema={atletaSchema}
                    defaultValues={defaultValues}
                    onSubmit={salvar}
                    onCancel={() => navigate(isEdicao ? `/atletas/${id}` : '/atletas')}
                    submitLabel={isEdicao ? 'Salvar' : 'Cadastrar'}
                />
            </FormCard>
        </PageContainer>
    );
}
