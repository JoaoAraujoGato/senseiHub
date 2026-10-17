import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { FaPlus } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import { Table } from '@/components/table/Table';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { useGetAtletasQuery } from '@/features/atleta/atletaApi';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';

export function AtletasPage() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('');

    const { data, isLoading, isError } = useGetAtletasQuery({ limit: 100 });
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });

    const faixas = useMemo(() => faixaData?.results ?? [], [faixaData]);
    const atletas = useMemo(() => data?.results ?? [], [data]);

    const nomeFaixa = (id) => faixas.find(f => f._id === id)?.nome ?? '—';

    const filtrados = useMemo(() =>
        atletas.filter(a => (a.nome ?? '').toLowerCase().includes(filtro.toLowerCase())
        ), [atletas, filtro]
    )

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
            chave: 'acoes', titulo: '', largura: '60px',
            render: (a) => (
                <IconButton onClick={() => navigate(`/atletas/${a._id}`)} title="Ver detalhes">
                    <MdSearch size={18} />
                </IconButton>
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
                <Button icon={<FaPlus size={14} />} onClick={() => navigate('/atletas/novo')}>Novo Atleta</Button>
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
        </PageContainer>
    )
}
