import styled from 'styled-components';

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #fcfcfc;
    }

    input, select, textarea {
        width: 100%;
        box-sizing: border-box;
        min-height: 2.5rem;
        padding: 0.6rem 0.8rem;
        border: 1px solid #535353;
        background-color: #1f2830;
        border-radius: 0.4rem;
        font-size: 0.9rem;
        line-height: 1.2;
        outline: none;
        color: #fff;
        font-family: inherit;
        &:focus { border-color: #C53A2C; }
    }

    textarea {
        resize: vertical;
        min-height: 5rem;
    }

    span {
        font-size: 0.75rem;
        color: #ef4444;
    }
`;

export const Secao = styled.section`
    margin-bottom: 1.75rem;

    &:last-of-type {
        margin-bottom: 0.5rem;
    }
`;

export const SecaoTitulo = styled.h2`
    margin: 0 0 0.9rem;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06rem;
    color: #9ca3af;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const Row = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;

    & > * {
        flex: 1 1 220px;
        min-width: 0;
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 0.8rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #2d3f4f;

    & > button {
        width: 100%;
    }

    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: flex-end;

        & > button {
            width: auto;
            min-width: 8rem;
        }
    }
`;

export const FormCard = styled.div`
    background: #1f2830;
    border-radius: 0.75rem;
    padding: 1.5rem;
`;
