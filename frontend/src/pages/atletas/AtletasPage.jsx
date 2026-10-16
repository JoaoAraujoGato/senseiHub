import { useMemo, useState } from 'react';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { FaPlus } from 'react-icons/fa'
import { MdEdit, MdPersonOff, MdPersonAdd } from 'react-icons/md'
import { Table } from '@/components/table/Table';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { AtletasModal } from './AtletasModal';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';
import { useGetTurmasQuery } from '@/features/turma/turmaApi';
import {
    useGetAtletasQuery,
    useCreateAtletaMutation,
    useUpdateAtletaMutation,
} from '@/features/atleta/atletaApi';

export function AtletasPage() {
    const [filtro, setFiltro] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [atletaSelecionado, setAtletaSelecionado] = useState(null);

    const { data, isLoading, isError } = useGetAtletasQuery({ limit: 100 });
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });
    const { data: turmaData } = useGetTurmasQuery({ limit: 100 });
    const [criarAtleta] = useCreateAtletaMutation();
    const [atualizarAtleta] = useUpdateAtletaMutation();

    const faixas = useMemo(() => faixaData?.results ?? [], [faixaData]);
    const turmas = useMemo(() => turmaData?.results ?? [], [turmaData]);
    const atletas = useMemo(() => data?.results ?? [], [data]);

    const nomeFaixa = (id) => faixas.find(f => f._id === id)?.nome ?? '—';

    const filtrados = useMemo(() =>
        atletas.filter(a => (a.nome ?? '').toLowerCase().includes(filtro.toLowerCase())
        ), [atletas, filtro]
    )

    const abrirCriacao = () => { setAtletaSelecionado(null); setModalAberto(true); };
    const abrirEdicao = (atleta) => { setAtletaSelecionado(atleta); setModalAberto(true); };
    const fecharModal = () => { setModalAberto(false); setAtletaSelecionado(null); };

    const salvar = async (dados) => {
        const limpos = Object.fromEntries(
            Object.entries(dados).filter(([, v]) => v !== '' && v !== undefined)
        );
        try {
            if (atletaSelecionado) {
                await atualizarAtleta({ id: atletaSelecionado._id, ...limpos }).unwrap();
            } else {
                await criarAtleta(limpos).unwrap();
            }
            fecharModal();
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar atleta');
        }
    };

    const alternarStatus = async (atleta) => {
        const novo = atleta.status === 'inativo' ? 'ativo' : 'inativo';
        const verbo = novo === 'inativo' ? 'Inativar' : 'Ativar';
        if (!window.confirm(`${verbo} o atleta "${atleta.nome}"?`)) return;
        try {
            await atualizarAtleta({ id: atleta._id, status: novo }).unwrap();
        } catch {
            alert('Falha ao alterar status do atleta');
        }
    };

    const colunas = [
        { chave: 'nome', titulo: 'Nome' },
        { chave: 'email', titulo: 'E-mail', render: (a) => a.email || '—' },
        { chave: 'faixa', titulo: 'Faixa', render: (a) => nomeFaixa(a.faixa) },
        {
            chave: 'status', titulo: 'Status', largura: '100px', textAlign: 'center',
            render: (a) => (
                <Badge tone={a.status === 'inativo' ? 'neutral' : 'success'}>
                    {a.status === 'inativo' ? 'Inativo' : 'Ativo'}
                </Badge>
            ),
        },
        {
            chave: 'acoes', titulo: '', largura: '90px',
            render: (atleta) => (
                <>
                    <IconButton onClick={() => abrirEdicao(atleta)} title="Editar">
                        <MdEdit size={18} />
                    </IconButton>
                    <IconButton onClick={() => alternarStatus(atleta)} title={atleta.status === 'inativo' ? 'Ativar' : 'Inativar'}>
                        {atleta.status === 'inativo' ? <MdPersonAdd size={18} /> : <MdPersonOff size={18} />}
                    </IconButton>
                </>
            ),
        },
    ]

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>Atletas</h1>
                    <p>Gerencie os atletas do dojo.</p>
                </TitleGroup>
                <Button icon={<FaPlus size={14} />} onClick={abrirCriacao}>Novo Atleta</Button>
            </PageHeader>

            <Input
                placeholder="Filtrar por nome..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                style={{ maxWidth: 320, marginBottom: '1rem' }}
            />

            {isLoading ? (
                <Spinner label="Carregando atletas..." />
            ) : isError ? (
                <ErrorState>Não foi possível carregar os atletas.</ErrorState>
            ) : (
                <Table colunas={colunas} dados={filtrados} emptyMessage="Nenhum atleta encontrado." />
            )}

            <AtletasModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={salvar}
                atletaSelecionado={atletaSelecionado}
                faixas={faixas}
                turmas={turmas}
            />
        </PageContainer>
    )
}
