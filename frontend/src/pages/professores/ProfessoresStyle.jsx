import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
`;

export const Card = styled.button`
    text-align: left;
    background: #1f2830;
    border: 1px solid #2d3f4f;
    border-radius: 0.75rem;
    padding: 1.25rem;
    cursor: pointer;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: 0.2s ease;

    &:hover { border-color: #C53A2C; background: #232f39; }
    &:focus { outline: none; }
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    gap: 0.9rem;
`;

export const Avatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #dfe3e6;
    color: #1f2830;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 0;
`;

export const Nome = styled.span`
    font-size: 1.05rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
`;

export const Faixa = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: #0c131a;
    border-radius: 4rem;
    padding: 0.15rem 0.6rem;
    font-size: 0.78rem;
    color: #d1d5db;
`;

export const Dot = styled.span`
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ $cor }) => $cor || '#000'};
    border: 1px solid #6b7280;
`;

export const Papel = styled.span`
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.15rem 0.6rem;
    border-radius: 4rem;
    background: ${({ $admin }) => ($admin ? '#C53A2C' : '#2d3f4f')};
    color: ${({ $admin }) => ($admin ? '#fff' : '#d1d5db')};
`;

export const Contato = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: #d1d5db;
`;

export const Linha = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
`;

export const Tag = styled.span`
    background: #0c131a;
    border: 1px solid #2d3f4f;
    border-radius: 4rem;
    padding: 0.15rem 0.6rem;
    font-size: 0.75rem;
    color: #d1d5db;
`;
