import { useMemo, useState } from 'react';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { BeltPreview, BeltPrimary, BeltSecondary } from './FaixasStyle';
import { FaPlus } from 'react-icons/fa'
import { MdEdit, MdBlock } from 'react-icons/md'
import { FaixaModal } from './FaixasModal';
import { Table } from '@/components/table/Table';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import {
    useGetFaixasQuery,
    useCreateFaixaMutation,
    useUpdateFaixaMutation,
    useRemoveFaixaMutation,
} from '@/features/faixa/faixaApi';

export function FaixasPage() {
    const [filtro, setFiltro]               = useState('');
    const [modalAberto, setModalAberto]     = useState(false);
    const [faixaSelecionada, setFaixaSelecionada] = useState(null);

    const { data, isLoading, isError } = useGetFaixasQuery({ limit: 100 }); // ponytail: limite alto; paginação real se passar de 100
    const [criarFaixa]    = useCreateFaixaMutation();
    const [atualizarFaixa] = useUpdateFaixaMutation();
    const [inativarFaixa] = useRemoveFaixaMutation();

    const faixas = useMemo(() => data?.results ?? [], [data]);

    const faixasFiltradas = useMemo(() =>
        faixas.filter(f => f.nome.toLowerCase().includes(filtro.toLowerCase())
        ), [faixas, filtro]
    )

    const abrirModalCriacao = () => {
        setFaixaSelecionada(null)
        setModalAberto(true)
    };

    const abrirModalEdicao = (faixa) => {
        setFaixaSelecionada(faixa)
        setModalAberto(true)
    };

    const fecharModal = () => {
        setModalAberto(false)
        setFaixaSelecionada(null)
    };

    const salvarFaixa = async (dados) => {
        try {
            if (faixaSelecionada) {
                await atualizarFaixa({ id: faixaSelecionada._id, ...dados }).unwrap();
            } else {
                await criarFaixa(dados).unwrap();
            }
            fecharModal();
        } catch (err) {
            alert(err?.data?.message ?? 'Falha ao salvar faixa');
        }
    };

    const handleInativar = async (faixa) => {
        if (!window.confirm(`Inativar a faixa "${faixa.nome}"?`)) return;
        try {
            await inativarFaixa(faixa._id).unwrap();
        } catch {
            alert('Falha ao inativar faixa');
        }
    };

    const colunas = [
        {
            chave: 'nome',
            titulo: 'Nome',
        },
        {
            chave: 'cor',
            titulo: 'Cor',
            largura: '80px',
            render: (faixa) => (
                <BeltPreview>
                    <BeltPrimary $cor={faixa.corPrincipalHex} />
                    {faixa.corSecundariaHex && (
                        <BeltSecondary $cor={faixa.corSecundariaHex} />
                    )}
                </BeltPreview>
            ),
        },
        {
            chave: 'ordem',
            titulo: 'Ordem',
            largura: '100px',
            textAlign: 'center'
        },
        {
            chave: 'status',
            titulo: 'Status',
            largura: '100px',
            textAlign: 'center',
            render: (faixa) => (
                <Badge tone={faixa.status === false ? 'neutral' : 'success'}>
                    {faixa.status === false ? 'Inativa' : 'Ativa'}
                </Badge>
            ),
        },
        {
            chave: 'acoes',
            titulo: '',
            largura: '90px',
            render: (faixa) => (
                <>
                    <IconButton onClick={() => abrirModalEdicao(faixa)} title="Editar">
                        <MdEdit size={18} />
                    </IconButton>
                    {faixa.status !== false && (
                        <IconButton onClick={() => handleInativar(faixa)} title="Inativar">
                            <MdBlock size={18} />
                        </IconButton>
                    )}
                </>
            ),
        },
    ]

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>Faixas</h1>
                    <p>Gerencie as faixas e graduações cadastradas no sistema.</p>
                </TitleGroup>

                <Button icon={<FaPlus size={14} />} onClick={abrirModalCriacao}>
                    Nova Faixa
                </Button>
            </PageHeader>

            <Input
                placeholder="Filtrar por nome..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                style={{ maxWidth: 320, marginBottom: '1rem' }}
            />

            {isLoading ? (
                <Spinner label="Carregando faixas..." />
            ) : isError ? (
                <ErrorState>Não foi possível carregar as faixas. Verifique a conexão com o servidor.</ErrorState>
            ) : (
                <Table
                    colunas={colunas}
                    dados={faixasFiltradas}
                    emptyMessage="Nenhuma faixa encontrada."
                />
            )}

            <FaixaModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={salvarFaixa}
                faixaSelecionada={faixaSelecionada}
            />
        </PageContainer>
    )
}
