import { useCallback, useMemo, useState } from 'react';
import { faixasMock } from '../../assets/Dados';
import { PageContainer, AddButton, FilterInput, Header, TitleGroup, EditButton, BeltPreview, BeltPrimary, BeltSecondary } from './FaixasStyle';
import { FaPlus } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { FaixaModal } from './FaixasModal';
import { Table } from '../../components/table/Table';

export function FaixasPage() {
    const [faixas, setFaixas]                   = useState([...faixasMock])
    const [filtro, setFiltro]                   = useState('')
    const [modalAberto, setModalAberto]         = useState(false)
    const [faixaSelecionada, setFaixaSelecionada] = useState(null)

    const faixasFiltradas = useMemo(() =>
        faixas.filter(f =>
            f.nome.toLowerCase().includes(filtro.toLowerCase())
        ), [faixas, filtro]
    )

    const abrirModalCriacao = useCallback(() => {
        setFaixaSelecionada(null)
        setModalAberto(true)
    },[]);

    const abrirModalEdicao = useCallback((faixa) => {
        setFaixaSelecionada(faixa)
        setModalAberto(true)
    },[]);

    const fecharModal = useCallback(() => {
        setModalAberto(false)
        setFaixaSelecionada(null)
    },[]);

    const salvarFaixa = useCallback((dados) => {
        if (faixaSelecionada) {
            // edição
            setFaixas(prev => prev.map(f =>
                f._id === faixaSelecionada._id ? { ...f, ...dados } : f
            ))
        } else {
            // criação
            setFaixas(prev => [...prev, {
                ...dados,
                _id: `faixa-${Date.now()}`,
                ordem: prev.length + 1,
                dataCadastro: new Date(),
            }])
        }
        fecharModal()
    },[faixaSelecionada, fecharModal]);

    const colunas = useMemo(() => [
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
            chave: 'acoes',
            titulo: '',
            largura: '60px',
            render: (faixa) => (
                <EditButton onClick={() => abrirModalEdicao(faixa)}>
                    <MdEdit size={18} />
                </EditButton>
            ),
        },
    ], [abrirModalEdicao])

    return (
        <PageContainer>
            <Header>
                <TitleGroup>
                    <h1>Faixas</h1>
                    <p>Gerencie as faixas e graduações cadastradas no sistema.</p>
                </TitleGroup>

                <AddButton onClick={abrirModalCriacao}>
                    <FaPlus size={14} />
                    Nova Faixa
                </AddButton>
            </Header>

            <FilterInput
                placeholder="Filtrar por nome..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
            />

            <Table
                colunas={colunas}
                dados={faixasFiltradas}
                emptyMessage="Nenhuma faixa encontrada."
            />

            <FaixaModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={salvarFaixa}
                faixaSelecionada={faixaSelecionada}
            />
        </PageContainer>
    )
}