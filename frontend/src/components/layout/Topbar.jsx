import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { encontrarTitulo } from '@/routes/navConfig';
import { Bar, Toggle, Titulo } from './AppLayoutStyle';

export function Topbar({ onToggleMenu }) {
    const { pathname } = useLocation();

    return (
        <Bar>
            <Toggle onClick={onToggleMenu} aria-label="Mostrar/ocultar menu" title="Menu">
                <MdMenu size={22} />
            </Toggle>
            <Titulo>{encontrarTitulo(pathname)}</Titulo>
        </Bar>
    );
}

Topbar.propTypes = {
    onToggleMenu: PropTypes.func.isRequired,
};
