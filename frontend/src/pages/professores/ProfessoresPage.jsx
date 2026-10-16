import { useMemo, useState } from 'react';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { FaPlus } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { Table } from '@/components/table/Table';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { ProfessoresModal } from './ProfessoresModal';
import {
    useGetProfessorsQuery,
    useCreateProfessorMutation,
    useUpdateProfessorMutation,
} from '@/features/professor/professorApi';

const PAPEL_LABEL = { admin: 'Administrador', professor: 'Professor' };

export function ProfessoresPage() {
    const [filtro, setFiltro] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);

    const { data, isLoading, isError } = useGetProfessorsQuery({ limit: 100 });
    const [criarProfessor] = useCreateProfessorMutation();
    const [atualizarProfessor] = useUpdateProfessorMutation();

    const professores = useMemo(() => data?.results ?? [], [data]);

    const filtrados = useMemo(() =>
        professores.filter(p => (p.nome ?? '').toLowerCase().includes(filtro.toLowerCase())
        ), [professores, filtro]
    )

    const abrirCriacao = () => { setProfessorSelecionado(null); setModalAberto(true); };
    const abrirEdicao = (professor) => { setProfessorSelecionado(professor); setModalAberto(true); };
    const fecharModal = () => { setModalAberto(false); setProfessorSelecionado(null); };

    const salvar = async (dados) => {
        // remove campos vazios: senha vazia mantém a atual; papel/gênero vazios não são enviados
        const limpos = Object.fromEntries(Object.entries(dados).filter(([, v]) => v !== '' && v !== undefined));
        try {
            if (professorSelecionado) {
                await atualizarProfessor({ id: professorSelecionado._id, ...limpos }).unwrap();
            } else {
                await criarProfessor(limpos).unwrap();
            }
            fecharModal();
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar professor');
        }
    };

    const colunas = [
        { chave: 'nome', titulo: 'Nome' },
        { chave: 'email', titulo: 'E-mail' },
        { chave: 'papel', titulo: 'Papel', render: (p) => PAPEL_LABEL[p.papel] ?? '—' },
        { chave: 'numeroContato', titulo: 'Contato', render: (p) => p.numeroContato || '—' },
        {
            chave: 'status', titulo: 'Status', largura: '100px', textAlign: 'center',
            render: (p) => (
                <Badge tone={p.status === false ? 'neutral' : 'success'}>
                    {p.status === false ? 'Inativo' : 'Ativo'}
                </Badge>
            ),
        },
        {
            chave: 'acoes', titulo: '', largura: '60px',
            render: (p) => (
                <IconButton onClick={() => abrirEdicao(p)} title="Editar">
                    <MdEdit size={18} />
                </IconButton>
            ),
        },
    ]

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>Professores</h1>
                    <p>Gerencie os professores do dojo.</p>
                </TitleGroup>
                <Button icon={<FaPlus size={14} />} onClick={abrirCriacao}>Novo Professor</Button>
            </PageHeader>

            <Input
                placeholder="Filtrar por nome..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                style={{ maxWidth: 320, marginBottom: '1rem' }}
            />

            {isLoading ? (
                <Spinner label="Carregando professores..." />
            ) : isError ? (
                <ErrorState>Não foi possível carregar os professores.</ErrorState>
            ) : (
                <Table colunas={colunas} dados={filtrados} emptyMessage="Nenhum professor encontrado." />
            )}

            <ProfessoresModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={salvar}
                professorSelecionado={professorSelecionado}
            />
        </PageContainer>
    )
}
