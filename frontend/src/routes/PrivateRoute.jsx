import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '@/features/auth/authSlice';

export function PrivateRoute({ children }) {
    const token = useSelector(selectToken);
    return token ? children : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};
