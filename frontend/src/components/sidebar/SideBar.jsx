import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import ImageLogo from '@/components/image/ImageLogo';
import logo from '@/assets/images/logoDark.png';
import { NAV_GROUPS } from '@/routes/navConfig';
import { logout } from '@/features/auth/authSlice';
import {
    Avatar, Container, Footer, Grupo, GrupoTitulo, Imagem, Item, LeftContent,
    LogoutButton, Menu, Profile, ProfileBelt, ProfileInfo, ProfileName,
} from './SideBarStyle';

function getInitials(name) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");
}

export function Sidebar({ aberta = true }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // perfil estático por enquanto (WIP: usar dados do professor logado)
    const user = { nome: "João Araujo", faixa: "Preta 1° dan", corFaixa: "#000000" };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <Container $aberta={aberta} aria-hidden={!aberta}>
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
                {NAV_GROUPS.map((grupo) => (
                    <Grupo key={grupo.titulo}>
                        <GrupoTitulo>{grupo.titulo}</GrupoTitulo>
                        {grupo.itens.map(({ to, label, icon: Icon }) => (
                            <Item key={to} to={to}>
                                <LeftContent>
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </LeftContent>
                            </Item>
                        ))}
                    </Grupo>
                ))}
            </Menu>

            <Footer>
                <Profile>
                    <LeftContent>
                        <Avatar>{getInitials(user.nome)}</Avatar>
                        <ProfileInfo>
                            <ProfileName>{user.nome}</ProfileName>
                            <ProfileBelt $corFaixa={user.corFaixa}>{user.faixa}</ProfileBelt>
                        </ProfileInfo>
                    </LeftContent>

                    <LogoutButton onClick={handleLogout} title="Sair" aria-label="Sair">
                        <MdLogout />
                    </LogoutButton>
                </Profile>
            </Footer>
        </Container>
    );
}

Sidebar.propTypes = {
    aberta: PropTypes.bool,
};
