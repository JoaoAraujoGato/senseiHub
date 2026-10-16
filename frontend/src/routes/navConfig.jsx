import { MdDashboard, MdAttachMoney, MdCampaign, MdSettings } from 'react-icons/md';
import { FaUsers, FaUniversity, FaUserTie, FaTrophy, FaBook } from 'react-icons/fa';
import { GiBlackBelt } from 'react-icons/gi';
import { BsCalendarCheck, BsActivity } from 'react-icons/bs';
import { PiExamBold } from 'react-icons/pi';

// Fonte única da navegação: usada pela Sidebar e pelo título do Topbar.
export const NAV_GROUPS = [
    {
        titulo: 'Principal',
        itens: [
            { to: '/dashboard', label: 'Dashboard', icon: MdDashboard },
            { to: '/atletas', label: 'Atletas', icon: FaUsers },
            { to: '/turmas', label: 'Turmas', icon: FaUniversity },
            { to: '/presenca', label: 'Presença', icon: BsCalendarCheck },
        ],
    },
    {
        titulo: 'Treinamento',
        itens: [
            { to: '/treinos', label: 'Treinos', icon: BsActivity },
            { to: '/tecnicas', label: 'Técnicas', icon: FaBook },
            { to: '/faixas', label: 'Faixas', icon: GiBlackBelt },
        ],
    },
    {
        titulo: 'Gestão',
        itens: [
            { to: '/exames', label: 'Exames de Faixa', icon: PiExamBold },
            { to: '/campeonatos', label: 'Campeonatos', icon: FaTrophy },
            { to: '/financeiro', label: 'Financeiro', icon: MdAttachMoney },
            { to: '/comunicados', label: 'Comunicados', icon: MdCampaign },
        ],
    },
    {
        titulo: 'Administração',
        itens: [
            { to: '/professores', label: 'Professores', icon: FaUserTie },
            { to: '/configuracoes', label: 'Configurações', icon: MdSettings },
        ],
    },
];

export const encontrarTitulo = (pathname) =>
    NAV_GROUPS
        .flatMap((grupo) => grupo.itens)
        .find((item) => item.to === pathname)?.label ?? 'Sensei Hub';
