import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '@/features/auth/authSlice';

// Rota pública que só renderiza quando NÃO há sessão (ex.: /login).
export function PublicOnlyRoute({ children }) {
    const token = useSelector(selectToken);
    return token ? <Navigate to="/dashboard" replace /> : children;
}

PublicOnlyRoute.propTypes = {
    children: PropTypes.node,
};
