import styled from "styled-components"

export const Container = styled.div`
    width: 240px;
    min-height: 100vh;
    background: #000000;
    border-right: 1px solid #252525;
    display: flex;          
    flex-direction: column; 
`

export const Imagem = styled.div`
    padding-bottom: 1rem;
    border-bottom: 1px solid #252525;
`

export const Menu = styled.nav`
    padding: 1rem 0.5rem;
`

export const Item = styled.button`
    width: 100%;

    background: ${({ $active }) =>
        $active
            ? "rgba(125, 23, 23, 0.656)"
            : "transparent"};

    border: none;
    border-left: 3px solid ${({ $active }) =>
        $active ? "rgba(220, 80, 80, 0.9)" : "transparent"}; // 👈 borda esquerda

    color: #FFFF;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.9rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 0.2s ease;

    &:focus {
        outline: none; // 👈 Tira o contorno padrão do navegador ao clicar em um item
    }

    &:hover {
        background: ${({ $active }) =>
        $active
            ? "rgba(199, 37, 37, 0.523)" // 👈 corrigir hover (era branco no branco)
            : "#252525"};
    }
`

export const LeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    i {
        font-size: 1rem;
    }

    span {
        font-size: 0.9rem;
    }
`

export const Badge = styled.span`
    color: #EAB308;
    font-size: 0.6rem;
    font-weight: 700;
`

export const Footer = styled.div`
    padding: 1rem 0.5rem;
    border-top: 1px solid #252525;
    margin-top: auto;
`

export const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    padding: 0.6rem 0.8rem;
    border-radius: 0.5rem;
    transition: 0.2s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`
export const LogoutButton = styled.button`
    background: transparent;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    transition: 0.2s ease;
    flex-shrink: 0;

    &:hover {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }

    &:focus {
        outline: none;
    }

    i {
        font-size: 1rem;
    }
`

export const Avatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #3b3b3b;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 4px;
    gap: 0.2rem;
`

export const ProfileName = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
    padding-left: 4px;
`

export const ProfileBelt = styled.span`
    background-color: #1f2830;
    border-radius: 4rem;
    font-size: 0.75rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0px 8px 0px 8px;

    &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${({ $corFaixa }) =>
            $corFaixa ? $corFaixa : "#000000"};
        border: 1px solid white;
        flex-shrink: 0;
    }
`