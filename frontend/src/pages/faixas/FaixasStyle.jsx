import styled from 'styled-components'

export const PageContainer = styled.div`
    padding: 2rem;
    max-width: 100%;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    border-bottom: 1px solid #1f2830;
`

export const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    p {
        font-size: 0.9rem;
        color: #6b7280;
        margin: 0;
    }
`

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #C53A2C;
    color: #ffffff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover { opacity: 0.85; }
    &:focus { outline: none; }
`

export const FilterInput = styled.input`
    width: 100%;
    max-width: 320px;
    padding: 0.6rem 0.9rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    outline: none;
    background: #0c131a;       /* 👈 fundo escuro */
    color: #ffffff;             /* 👈 texto branco */

    &::placeholder { color: #6b7280; }
    &:focus { border-color: #C53A2C; }
`

export const BeltPreview = styled.div`
    width: 80px;
    height: 22px;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    border: 1px solid #e5e7eb;
`

export const BeltPrimary = styled.div`
    flex: 4;  /* 80% */
    background: ${({ $cor }) => $cor};
`

export const BeltSecondary = styled.div`
    flex: 1;  /* 20% */
    background: ${({ $cor }) => $cor};
`

export const EditButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #6b7280;
    display: flex;
    align-items: center;
    padding: 0.3rem;
    border-radius: 0.3rem;
    transition: 0.2s ease;
    &:hover { color: #C53A2C; background: rgba(197,58,44,0.08); }
    &:focus { outline: none; }
`