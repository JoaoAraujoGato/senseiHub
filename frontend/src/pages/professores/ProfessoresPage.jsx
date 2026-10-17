import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';
import { FaPlus } from 'react-icons/fa'
import { MdEmail, MdPhone } from 'react-icons/md'
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { PAPEL_OPTIONS } from '@/shared/constants';
import { useGetProfessorsQuery } from '@/features/professor/professorApi';
import { useGetFaixasQuery } from '@/features/faixa/faixaApi';
import { useGetTurmasQuery } from '@/features/turma/turmaApi';
import { Grid, Card, Top, Avatar, Info, Nome, Meta, Faixa, Dot, Papel, Contato, Linha, Tags, Tag } from './ProfessoresStyle';

const initials = (nome = '') => nome.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('');
const papelLabel = (value) => PAPEL_OPTIONS.find(o => o.value === value)?.label ?? '—';

export function ProfessoresPage() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('');

    const { data, isLoading, isError } = useGetProfessorsQuery({ limit: 100 });
    const { data: faixaData } = useGetFaixasQuery({ limit: 100 });
    const { data: turmaData } = useGetTurmasQuery({ limit: 100 });

    const faixas = useMemo(() => faixaData?.results ?? [], [faixaData]);
    const turmas = useMemo(() => turmaData?.results ?? [], [turmaData]);
    const professores = useMemo(() => data?.results ?? [], [data]);

    const filtrados = useMemo(() =>
        professores.filter(p => (p.nome ?? '').toLowerCase().includes(filtro.toLowerCase())
        ), [professores, filtro]
    )

    const faixaDe = (id) => faixas.find(f => f._id === id);
    const turmasDe = (profId) => turmas
        .filter(t => (t.professorResponsavel ?? []).some(x => (typeof x === 'string' ? x : x._id) === profId))
        .map(t => t.nome);

    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>Professores</h1>
                    <p>Instrutores e administradores do dojô</p>
                </TitleGroup>
                <Button icon={<FaPlus size={14} />} onClick={() => navigate('/professores/novo')}>Novo Professor</Button>
            </PageHeader>

            <Input
                placeholder="Filtrar por nome do professor..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                style={{ maxWidth: 320, marginBottom: '1rem' }}
            />

            {isLoading ? (
                <Spinner label="Carregando professores..." />
            ) : isError ? (
                <ErrorState>Não foi possível carregar os professores.</ErrorState>
            ) : filtrados.length === 0 ? (
                <p style={{ color: '#6b7280' }}>Nenhum professor encontrado.</p>
            ) : (
                <Grid>
                    {filtrados.map(p => {
                        const faixa = faixaDe(p.faixa);
                        const tags = turmasDe(p._id);
                        return (
                            <Card key={p._id} onClick={() => navigate(`/professores/${p._id}`)}>
                                <Top>
                                    <Avatar>{initials(p.nome)}</Avatar>
                                    <Info>
                                        <Nome>{p.nome}</Nome>
                                        <Meta>
                                            <Faixa>
                                                <Dot $cor={faixa?.corPrincipalHex} />
                                                {faixa?.nome ?? 'Sem faixa'}
                                            </Faixa>
                                            <Papel $admin={p.papel === 'admin'}>{papelLabel(p.papel)}</Papel>
                                        </Meta>
                                    </Info>
                                </Top>

                                <Contato>
                                    {p.email && <Linha><MdEmail size={16} />{p.email}</Linha>}
                                    {p.numeroContato && <Linha><MdPhone size={16} />{p.numeroContato}</Linha>}
                                </Contato>

                                {tags.length > 0 && (
                                    <Tags>
                                        {tags.map(t => <Tag key={t}>{t}</Tag>)}
                                    </Tags>
                                )}
                            </Card>
                        );
                    })}
                </Grid>
            )}
        </PageContainer>
    )
}
