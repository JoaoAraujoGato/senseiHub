import PropTypes from 'prop-types';
import styled from 'styled-components';

const Grid = styled.dl`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem 1.5rem;
    margin: 0;
    padding: 1.5rem;
    background: #1f2830;
    border-radius: 0.75rem;
`;

const Label = styled.dt`
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
`;

const Value = styled.dd`
    margin: 0;
    font-size: 0.95rem;
    word-break: break-word;
`;

export function InfoList({ items }) {
    return (
        <Grid>
            {items.map(({ label, value }) => (
                <div key={label}>
                    <Label>{label}</Label>
                    <Value>{value ?? '—'}</Value>
                </div>
            ))}
        </Grid>
    );
}

InfoList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.node,
    })).isRequired,
};
