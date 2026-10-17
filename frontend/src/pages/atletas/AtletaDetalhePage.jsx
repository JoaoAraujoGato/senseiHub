import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdPersonOff, MdPersonAdd, MdDelete } from 'react-icons/md';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { InfoList } from '@/components/ui/InfoList';
import { GENERO_OPTIONS, STATUS_ATLETA_OPTIONS, RESPONSAVEL_OPTIONS, RELACAO_OPTIONS } from '@/shared/constants';
import {
    useGetAtletaQuery,
    useUpdateAtletaMutation,
    useRemoveAtletaMutation,
} from '@/features/atleta/atletaApi';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';
import { useGetTurmasQuery } from '@/features/turma/turmaApi';

const labelOf = (options, value) => options.find(o => o.value === value)?.label ?? '—';

export function AtletaDetalhePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: atleta, isLoading, isError } = useGetAtletaQuery(id);
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });
    const { data: turmaData } = useGetTurmasQuery({ limit: 100 });
    const [atualizarAtleta] = useUpdateAtletaMutation();
    const [removerAtleta] = useRemoveAtletaMutation();

    const faixas = useMemo(() => faixaData?.results ?? [], [faixaData]);
    const turmas = useMemo(() => turmaData?.results ?? [], [turmaData]);

    if (isLoading) return <PageContainer><Spinner label="Carregando atleta..." /></PageContainer>;
    if (isError || !atleta) return <PageContainer><ErrorState>Não foi possível carregar o atleta.</ErrorState></PageContainer>;

    const nomeFaixa = (fid) => faixas.find(f => f._id === fid)?.nome ?? '—';
    const nomesTurmas = (lista) => (lista ?? [])
        .map(t => turmas.find(x => x._id === (typeof t === 'string' ? t : t._id))?.nome)
        .filter(Boolean)
        .join(', ') || '—';

    const inativo = atleta.status === 'inativo';

    const alternarStatus = async () => {
        try {
            await atualizarAtleta({ id, status: inativo ? 'ativo' : 'inativo' }).unwrap();
        } catch {
            alert('Falha ao alterar status do atleta');
        }
    };

    const excluir = async () => {
        if (!window.confirm(`Excluir o atleta "${atleta.nome}"?`)) return;
        try {
            await removerAtleta(id).unwrap();
            navigate('/atletas');
        } catch {
            alert('Falha ao excluir atleta');
        }
    };

    const responsaveis = (atleta.responsaveis ?? [])
        .map(r => `${labelOf(RESPONSAVEL_OPTIONS, r.parentesco)}: ${r.nome || '—'} (${r.contato || '—'})`)
        .join(' | ');

    const ce = atleta.contatoEmergencia;
    const relacao = ce?.parentesco === 'outro' ? ce?.parentescoOutro : labelOf(RELACAO_OPTIONS, ce?.parentesco);
    const emergencia = ce?.nome ? `${ce.nome} (${relacao || '—'}) — ${ce.contato || '—'}` : '';

    const items = [
        { label: 'Nome', value: atleta.nome },
        { label: 'E-mail', value: atleta.email || '—' },
        { label: 'Data de nascimento', value: atleta.dataNascimento ? String(atleta.dataNascimento).slice(0, 10) : '—' },
        { label: 'Gênero', value: labelOf(GENERO_OPTIONS, atleta.genero) },
        { label: 'Peso', value: atleta.peso || '—' },
        { label: 'Faixa', value: nomeFaixa(atleta.faixa) },
        { label: 'Turmas', value: nomesTurmas(atleta.turmas) },
        {
            label: 'Status',
            value: <Badge tone={inativo ? 'neutral' : 'success'}>{labelOf(STATUS_ATLETA_OPTIONS, atleta.status)}</Badge>,
        },
        ...(responsaveis ? [{ label: 'Responsáveis', value: responsaveis }] : []),
        ...(emergencia ? [{ label: 'Contato de emergência', value: emergencia }] : []),
        { label: 'Alergias', value: atleta.alergias || '—' },
        { label: 'Observações', value: atleta.observacoes || '—' },
        { label: 'Cadastro', value: atleta.dataCadastro ? String(atleta.dataCadastro).slice(0, 10) : '—' },
    ];

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>{atleta.nome}</h1>
                    <p>Detalhes do atleta</p>
                </TitleGroup>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button variant="ghost" icon={<MdArrowBack size={16} />} onClick={() => navigate('/atletas')}>Voltar</Button>
                    <Button icon={<MdEdit size={16} />} onClick={() => navigate(`/atletas/${id}/editar`)}>Editar</Button>
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
