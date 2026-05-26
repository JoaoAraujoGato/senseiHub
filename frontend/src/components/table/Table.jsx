import PropTypes from 'prop-types'
import styled from 'styled-components'

const TableWrapper = styled.div`
    background: #1f2830;
    border-radius: 0.75rem;
    overflow: hidden;
`

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const Th = styled.th`
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
    border-bottom: 1px solid #2d3f4f;
    text-transform: uppercase;
`

const Td = styled.td`
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
    border-bottom: 1px solid #2d3f4f;
    vertical-align: middle;
`

const EmptyCell = styled.td`
    text-align: center;
    padding: 2rem;
    color: #6b7280;
    font-size: 0.9rem;
`

export function Table({ colunas, dados, emptyMessage = 'Nenhum registro encontrado.' }) {
    return (
        <TableWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        {colunas.map((col) => (
                            <Th
                                key={col.chave}
                                style={{ width: col?.largura ?? 'auto', 'text-align': col?.textAlign ?? 'start' }}  // largura opcional por coluna
                            >
                                {col.titulo}
                            </Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.length === 0 ? (
                        <tr>
                            <EmptyCell colSpan={colunas?.length} >
                                {emptyMessage}
                            </EmptyCell>
                        </tr>
                    ) : (
                        dados.map((item, index) => (
                            <tr key={item._id ?? index}>
                                {colunas.map((col) => (
                                    <Td key={col.chave} style={{ 'text-align': col?.textAlign ?? 'start' }}>
                                        {col.render   // render customizado ou valor direto
                                            ? col.render(item)
                                            : item[col.chave]
                                        }
                                    </Td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </StyledTable>
        </TableWrapper>
    )
}

Table.propTypes = {
    dados: PropTypes.arrayOf(PropTypes.object).isRequired,
    emptyMessage: PropTypes.string,
    colunas: PropTypes.arrayOf(
        PropTypes.shape({
            chave:   PropTypes.string.isRequired,
            titulo:  PropTypes.string.isRequired,
            largura: PropTypes.string,              // ex: '120px', '10%'
            render:  PropTypes.func,                // (item) => ReactNode
        })
    ).isRequired,
}

Table.defaultProps = {
    emptyMessage: 'Nenhum registro encontrado.',
}