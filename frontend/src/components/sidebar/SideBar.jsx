import  PropTypes from 'prop-types';
import styled from "styled-components"
import ImageLogo from "../image/ImageLogo"
import logo from "../../assets/images/logoDark.png"
import { useState } from 'react';

const Container = styled.div`
    width: 240px;
    min-height: 100vh;
    background: #000000;
    border-right: 1px solid #252525;
    display: flex;          
    flex-direction: column; 
`

const Imagem = styled.div`
    padding-bottom: 1rem;
    border-bottom: 1px solid #252525;
`

const Menu = styled.nav`
    padding: 1rem 0.5rem;
`

const Item = styled.button`
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

const LeftContent = styled.div`
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

const Badge = styled.span`
    color: #EAB308;
    font-size: 0.6rem;
    font-weight: 700;
`

const Footer = styled.div`
    padding: 1rem 0.5rem;
    border-top: 1px solid #252525;
    margin-top: auto;
`

const Profile = styled.div`
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
const LogoutButton = styled.button`
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

const Avatar = styled.div`
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

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 4px;
    gap: 0.2rem;
`

const ProfileName = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
    padding-left: 4px;
`

const ProfileBelt = styled.span`
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

function getInitials(name) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");
}

function SidebarItem({
    icon,
    label,
    active,
    badge,
    onClick
}) {
    return (
        <Item
            $active={active}
            onClick={onClick}
        >
            <LeftContent>
                <i className={`bi bi-${icon}`}></i>

                <span>{label}</span>
            </LeftContent>

            {badge && (
                <Badge>{badge}</Badge>
            )}
        </Item>
    )
}

SidebarItem.defaultProps = {
    icon: '',
    label: '',
    active: false,
    badge: '',
    onClick: () => {},
}

SidebarItem.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    badge: PropTypes.string,
    onClick: PropTypes.func,
}

export function Sidebar() {
    const [activeItem, setActiveItem] = useState("Dashboard"); // 👈 estado do item ativo
    const user = { nome: "João Araujo", faixa: "Preta 1° dan", corFaixa: "#000000" }; // 👈 seus dados de usuário

    const menuItems = [
        {
            icon: "grid",
            label: "Dashboard",
            badge: "WIP"
        },
        {
            icon: "people",
            label: "Atletas",
            badge: "WIP"
        },
        {
            icon: "bank",
            label: "Turmas",
            badge: "WIP"
        },
        {
            icon: "calendar-check",
            label: "Presença",
            badge: "WIP"
        },
        {
            icon: "activity",
            label: "Treino",
            badge: "WIP"
        },
        {
            icon: "mortarboard",
            label: "Exame de faixa",
            badge: "WIP"
        },
        {
            icon: "trophy",
            label: "Campeonatos",
            badge: "WIP"
        },
        {
            icon: "cash-coin",
            label: "Financeiro",
            badge: "WIP"
        },
        {
            icon: "megaphone",
            label: "Anúncios",
            badge: "WIP"
        },
        {
            icon: "person-workspace",
            label: "Professores",
            badge: "WIP",
            // badge: "ADMIN",
        },
        {
            icon: "gear",
            label: "Configurações",
            badge: "WIP",
            // badge: "ADMIN",
        },
    ]

    return (
        <Container>
            <Imagem>
                <ImageLogo
                    src={logo}
                    alt="SenseiHub"
                    width="8rem"
                    height="3.5rem"
                    radius="8px"
                />
            </Imagem>
            <Menu>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={activeItem === item.label} // 👈 compara com estado
                        badge={item.badge}
                        onClick={() => setActiveItem(item.label)} // 👈 atualiza estado
                    />
                ))}
            </Menu>
            <Footer>
                <Profile>
                    <div className='d-flex d-row'>
                        <Avatar>{getInitials(user?.nome)}</Avatar>
                        <ProfileInfo>
                            <ProfileName>{user?.nome}</ProfileName>
                            <ProfileBelt $corFaixa={user?.corFaixa}>{user?.faixa}</ProfileBelt>
                        </ProfileInfo>
                    </div>

                    <LogoutButton onClick={() => console.log("logout")} title="Sair">
                        <i className="bi bi-box-arrow-right"></i>
                    </LogoutButton>
                </Profile>
            </Footer>
        </Container>
    )
}