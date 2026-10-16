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
import { TecnicasModal } from './TecnicasModal';
import {
    useGetTecnicasQuery,
    useCreateTecnicaMutation,
    useUpdateTecnicaMutation,
    useRemoveTecnicaMutation,
} from '@/features/tecnica/tecnicaApi';

export function TecnicasPage() {
    const [filtro, setFiltro] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [tecnicaSelecionada, setTecnicaSelecionada] = useState(null);

    const { data, isLoading, isError } = useGetTecnicasQuery({ limit: 100 });
    const [criarTecnica] = useCreateTecnicaMutation();
    const [atualizarTecnica] = useUpdateTecnicaMutation();
    const [removerTecnica] = useRemoveTecnicaMutation();

    const tecnicas = useMemo(() => data?.results ?? [], [data]);

    const filtradas = useMemo(() =>
        tecnicas.filter(t => (t.nome ?? '').toLowerCase().includes(filtro.toLowerCase())
        ), [tecnicas, filtro]
    )

    const abrirCriacao = () => { setTecnicaSelecionada(null); setModalAberto(true); };
    const abrirEdicao = (tecnica) => { setTecnicaSelecionada(tecnica); setModalAberto(true); };
    const fecharModal = () => { setModalAberto(false); setTecnicaSelecionada(null); };

    const salvar = async (dados) => {
        const limpos = Object.fromEntries(Object.entries(dados).filter(([, v]) => v !== '' && v !== undefined));
        try {
            if (tecnicaSelecionada) {
                await atualizarTecnica({ id: tecnicaSelecionada._id, ...limpos }).unwrap();
            } else {
                await criarTecnica(limpos).unwrap();
            }
            fecharModal();
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar técnica');
        }
    };

    const handleExcluir = async (tecnica) => {
        if (!window.confirm(`Excluir a técnica "${tecnica.nome}"?`)) return;
        try {
            await removerTecnica(tecnica._id).unwrap();
        } catch {
            alert('Falha ao excluir técnica');
        }
    };

    const colunas = [
        { chave: 'nome', titulo: 'Nome' },
        { chave: 'nomeTraduzido', titulo: 'Tradução' },
        { chave: 'categoria', titulo: 'Categoria' },
        { chave: 'subCategoria', titulo: 'Subcategoria' },
        {
            chave: 'acoes', titulo: '', largura: '90px',
            render: (tecnica) => (
                <>
                    <IconButton onClick={() => abrirEdicao(tecnica)} title="Editar">
                        <MdEdit size={18} />
                    </IconButton>
                    <IconButton onClick={() => handleExcluir(tecnica)} title="Excluir">
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
                    <h1>Técnicas</h1>
                    <p>Biblioteca de técnicas do dojo.</p>
                </TitleGroup>
                <Button icon={<FaPlus size={14} />} onClick={abrirCriacao}>Nova Técnica</Button>
            </PageHeader>

            <Input
                placeholder="Filtrar por nome..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                style={{ maxWidth: 320, marginBottom: '1rem' }}
            />

            {isLoading ? (
                <Spinner label="Carregando técnicas..." />
            ) : isError ? (
                <ErrorState>Não foi possível carregar as técnicas.</ErrorState>
            ) : (
                <Table colunas={colunas} dados={filtradas} emptyMessage="Nenhuma técnica encontrada." />
            )}

            <TecnicasModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={salvar}
                tecnicaSelecionada={tecnicaSelecionada}
            />
        </PageContainer>
    )
}
