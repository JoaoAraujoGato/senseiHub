import styled from 'styled-components'

export const PageContainer = styled.div`
    padding: 2rem;
    max-width: 100%;
`

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`

export const Modal = styled.div`
    background: #1f2830;
    border: 1px solid #535353;
    border-radius: 0.75rem;
    padding: 2rem;
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #535353;
    align-items: center;
`

export const ModalTitle = styled.h2`
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
`

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    &:hover { color: #000; }
    &:focus { outline: none; }
`

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 0.1rem; */
    margin-bottom: 0.5rem;

    label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #fcfcfc;
    }

    input {
        padding: 0.6rem 0.8rem;
        border: 1px solid #535353;
        background-color: #1f2830;
        border-radius: 0.4rem;
        font-size: 0.9rem;
        outline: none;
        &:focus { border-color: #C53A2C; }
    }

    span {
        font-size: 0.75rem;
        color: #ef4444;
    }
`

export const ColorRow = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
`

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
`

export const Button = styled.button`
    display: flex;
    justify-content: center;
    padding: 0.6rem 1.2rem;
    border-radius: 0.4rem;
    width: 5.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;

    background: ${({ $variant }) => $variant === 'primary' ? '#2e6014' : '#cc3325'};
    color: #ffffff;

    &:hover {
        opacity: 0.85;
    }

    &:focus { outline: none; }
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