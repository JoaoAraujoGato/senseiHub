import { useMemo, useState } from 'react';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { FaPlus } from 'react-icons/fa'
import { MdEdit, MdDelete } from 'react-icons/md'
import { Table } from '@/components/table/Table';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { TurmasModal } from './TurmasModal';
import { DIAS_SEMANA } from '@/shared/constants';
import { useGetProfessorsQuery } from '@/features/professor/professorApi';
import {
    useGetTurmasQuery,
    useCreateTurmaMutation,
    useUpdateTurmaMutation,
    useRemoveTurmaMutation,
} from '@/features/turma/turmaApi';

const DIAS_VALUES = DIAS_SEMANA.map(d => d.value);

export function TurmasPage() {
    const [filtro, setFiltro] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);

    const { data, isLoading, isError } = useGetTurmasQuery({ limit: 100 });
    const { data: profData } = useGetProfessorsQuery({ limit: 100 });
    const [criarTurma] = useCreateTurmaMutation();
    const [atualizarTurma] = useUpdateTurmaMutation();
    const [removerTurma] = useRemoveTurmaMutation();

    const professores = useMemo(() => profData?.results ?? [], [profData]);
    const turmas = useMemo(() => data?.results ?? [], [data]);

    const nomeProfessor = (id) => professores.find(p => p._id === id)?.nome ?? '—';

    const filtradas = useMemo(() =>
        turmas.filter(t => (t.nome ?? '').toLowerCase().includes(filtro.toLowerCase())
        ), [turmas, filtro]
    )

    const abrirCriacao = () => { setTurmaSelecionada(null); setModalAberto(true); };
    const abrirEdicao = (turma) => { setTurmaSelecionada(turma); setModalAberto(true); };
    const fecharModal = () => { setModalAberto(false); setTurmaSelecionada(null); };

    const salvar = async (dados) => {
        const payload = {
            nome: dados.nome,
            capacidadeMaxima: dados.capacidadeMaxima,
            descricao: dados.descricao || undefined,
            professorResponsavel: dados.professorResponsavel,
            programacao: {
                dias: DIAS_VALUES.reduce((acc, d) => ({ ...acc, [d]: (dados.dias ?? []).includes(d) }), {}),
                horarioInicio: dados.horarioInicio,
                horarioFim: dados.horarioFim,
            },
        };
        try {
            if (turmaSelecionada) {
                await atualizarTurma({ id: turmaSelecionada._id, ...payload }).unwrap();
            } else {
                await criarTurma(payload).unwrap();
            }
            fecharModal();
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar turma');
        }
    };

    const handleExcluir = async (turma) => {
        if (!window.confirm(`Excluir a turma "${turma.nome}"?`)) return;
        try {
            await removerTurma(turma._id).unwrap();
        } catch {
            alert('Falha ao excluir turma');
        }
    };

    const colunas = [
        { chave: 'nome', titulo: 'Nome' },
        {
            chave: 'horario', titulo: 'Horário',
            render: (t) => `${t.programacao?.horarioInicio ?? '—'} – ${t.programacao?.horarioFim ?? '—'}`,
        },
        {
            chave: 'dias', titulo: 'Dias',
            render: (t) => DIAS_SEMANA
                .filter(d => t.programacao?.dias?.[d.value])
                .map(d => d.label.slice(0, 3))
                .join(', ') || '—',
        },
        {
            chave: 'professores', titulo: 'Professores',
            render: (t) => (t.professorResponsavel ?? []).map(p => nomeProfessor(typeof p === 'string' ? p : p._id)).join(', ') || '—',
        },
        { chave: 'capacidadeMaxima', titulo: 'Capacidade', largura: '100px', textAlign: 'center' },
        {
            chave: 'acoes', titulo: '', largura: '90px',
            render: (turma) => (
                <>
                    <IconButton onClick={() => abrirEdicao(turma)} title="Editar">
                        <MdEdit size={18} />
                    </IconButton>
                    <IconButton onClick={() => handleExcluir(turma)} title="Excluir">
                        <MdDelete size={18} />
                    </IconButton>
                </>
            ),
        },
    ]

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>Turmas</h1>
                    <p>Gerencie as turmas do dojo.</p>
                </TitleGroup>
                <Button icon={<FaPlus size={14} />} onClick={abrirCriacao}>Nova Turma</Button>
            </PageHeader>

            <Input
                placeholder="Filtrar por nome..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                style={{ maxWidth: 320, marginBottom: '1rem' }}
            />

            {isLoading ? (
                <Spinner label="Carregando turmas..." />
            ) : isError ? (
                <ErrorState>Não foi possível carregar as turmas.</ErrorState>
            ) : (
                <Table colunas={colunas} dados={filtradas} emptyMessage="Nenhuma turma encontrada." />
            )}

            <TurmasModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={salvar}
                turmaSelecionada={turmaSelecionada}
                professores={professores}
            />
        </PageContainer>
    )
}
