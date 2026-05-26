import  PropTypes from 'prop-types';
import ImageLogo from "../image/ImageLogo"
import logo from "../../assets/images/logoDark.png"
import { useState } from 'react';

import { MdDashboard, MdAttachMoney, MdCampaign, MdSettings } from 'react-icons/md'
import { FaUsers, FaUniversity, FaUserTie, FaTrophy } from 'react-icons/fa'
import { GiBlackBelt } from 'react-icons/gi'
import { BsCalendarCheck, BsActivity } from 'react-icons/bs'
import { PiExamBold } from 'react-icons/pi'
import { Avatar, Badge, Container, Footer, Imagem, Item, LeftContent, LogoutButton, Menu, Profile, ProfileBelt, ProfileInfo, ProfileName } from './SideBarStyle';

function getInitials(name) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");
}

function SidebarItem({
    icon: Icon,
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
                <Icon size={18} />

                <span>{label}</span>
            </LeftContent>

            {badge && (
                <Badge>{badge}</Badge>
            )}
        </Item>
    )
}

SidebarItem.defaultProps = {
    icon: () => {},
    label: '',
    active: false,
    badge: '',
    onClick: () => {},
}

SidebarItem.propTypes = {
    icon: PropTypes.elementType,
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
            icon: MdDashboard,
            label: "Dashboard",
            badge: "WIP"
        },
        {
            icon: FaUsers,
            label: "Atletas",
            badge: "WIP"
        },
        {
            icon: FaUniversity,
            label: "Turmas",
            badge: "WIP"
        },
        {
            icon: BsCalendarCheck,
            label: "Presença",
            badge: "WIP"
        },
        {
            icon: BsActivity,
            label: "Treino",
            badge: "WIP"
        },
        {
            icon: GiBlackBelt,
            label: "Faixas",
            badge: "WIP"
        },
        {
            icon: PiExamBold,
            label: "Exame de faixa",
            badge: "WIP"
        },
        {
            icon: FaTrophy,
            label: "Campeonatos",
            badge: "WIP"
        },
        {
            icon: MdAttachMoney,
            label: "Financeiro",
            badge: "WIP"
        },
        {
            icon: MdCampaign,
            label: "Anúncios",
            badge: "WIP"
        },
        {
            icon: FaUserTie,
            label: "Professores",
            badge: "WIP",
            // badge: "ADMIN",
        },
        {
            icon: MdSettings,
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