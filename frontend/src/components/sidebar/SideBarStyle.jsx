import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const Container = styled.aside`
    width: ${({ $aberta }) => ($aberta ? '240px' : '0')};
    flex-shrink: 0;
    height: 100vh;
    position: sticky;
    top: 0;
    background: #000000;
    border-right: 1px solid ${({ $aberta }) => ($aberta ? '#252525' : 'transparent')};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.2s ease;
`

export const Imagem = styled.div`
    padding-bottom: 1rem;
    border-bottom: 1px solid #252525;
    white-space: nowrap;
`

export const Menu = styled.nav`
    padding: 1rem 0.5rem;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`

export const Grupo = styled.div`
    margin-bottom: 1rem;
`

export const GrupoTitulo = styled.p`
    margin: 0.5rem 0 0.3rem;
    padding: 0 1rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: #6b7280;
    white-space: nowrap;
`

export const Item = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.7rem 1rem;
    margin: 0.1rem 0;
    border-radius: 0.5rem;
    border-left: 3px solid transparent;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: 0.2s ease;

    &:hover {
        background: #252525;
    }

    &:focus {
        outline: none;
    }

    &.active {
        background: rgba(125, 23, 23, 0.656);
        border-left-color: rgba(220, 80, 80, 0.9);
    }

    &.active:hover {
        background: rgba(199, 37, 37, 0.523);
    }
`

export const LeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
        font-size: 0.9rem;
    }
`

export const Footer = styled.div`
    padding: 1rem 0.5rem;
    border-top: 1px solid #252525;
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
        background: rgba(255, 255, 255, 0.04);
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
    gap: 0.2rem;
    white-space: nowrap;
`

export const ProfileName = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
`

export const ProfileBelt = styled.span`
    background-color: #1f2830;
    border-radius: 4rem;
    font-size: 0.75rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0 8px;
    width: fit-content;

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
