import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdPersonOff, MdPersonAdd, MdDelete } from 'react-icons/md';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { InfoList } from '@/components/ui/InfoList';
import { PAPEL_OPTIONS, GENERO_OPTIONS } from '@/shared/constants';
import {
    useGetProfessorQuery,
    useUpdateProfessorMutation,
    useRemoveProfessorMutation,
} from '@/features/professor/professorApi';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';

const labelOf = (options, value) => options.find(o => o.value === value)?.label ?? '—';

export function ProfessorDetalhePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: professor, isLoading, isError } = useGetProfessorQuery(id);
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });
    const [atualizarProfessor] = useUpdateProfessorMutation();
    const [removerProfessor] = useRemoveProfessorMutation();

    const faixas = useMemo(() => faixaData?.results ?? [], [faixaData]);

    if (isLoading) return <PageContainer><Spinner label="Carregando professor..." /></PageContainer>;
    if (isError || !professor) return <PageContainer><ErrorState>Não foi possível carregar o professor.</ErrorState></PageContainer>;

    const nomeFaixa = (fid) => faixas.find(f => f._id === fid)?.nome ?? '—';
    const inativo = professor.status === false;

    const alternarStatus = async () => {
        try {
            await atualizarProfessor({ id, status: inativo }).unwrap();
        } catch {
            alert('Falha ao alterar status do professor');
        }
    };

    const excluir = async () => {
        if (!window.confirm(`Excluir o professor "${professor.nome}"? Ele será removido das turmas em que for responsável.`)) return;
        try {
            await removerProfessor(id).unwrap();
            navigate('/professores');
        } catch {
            alert('Falha ao excluir professor');
        }
    };

    const items = [
        { label: 'Nome', value: professor.nome },
        { label: 'E-mail', value: professor.email || '—' },
        { label: 'Contato', value: professor.numeroContato || '—' },
        { label: 'Papel', value: labelOf(PAPEL_OPTIONS, professor.papel) },
        { label: 'Gênero', value: labelOf(GENERO_OPTIONS, professor.genero) },
        { label: 'Faixa', value: nomeFaixa(professor.faixa) },
        {
            label: 'Status',
            value: <Badge tone={inativo ? 'neutral' : 'success'}>{inativo ? 'Inativo' : 'Ativo'}</Badge>,
        },
        { label: 'Cadastro', value: professor.dataCadastro ? String(professor.dataCadastro).slice(0, 10) : '—' },
    ];

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>{professor.nome}</h1>
                    <p>Detalhes do professor</p>
                </TitleGroup>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button variant="ghost" icon={<MdArrowBack size={16} />} onClick={() => navigate('/professores')}>Voltar</Button>
                    <Button icon={<MdEdit size={16} />} onClick={() => navigate(`/professores/${id}/editar`)}>Editar</Button>
                    <Button
                        variant="secondary"
                        icon={inativo ? <MdPersonAdd size={16} /> : <MdPersonOff size={16} />}
                        onClick={alternarStatus}
                    >
                        {inativo ? 'Ativar' : 'Inativar'}
                    </Button>
                    <Button variant="danger" icon={<MdDelete size={16} />} onClick={excluir}>Excluir</Button>
                </div>
            </PageHeader>

            <InfoList items={items} />
        </PageContainer>
    );
}
