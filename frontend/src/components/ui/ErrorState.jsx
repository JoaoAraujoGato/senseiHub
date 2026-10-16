import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledError = styled.p`
    color: #f87171;
    font-size: 0.9rem;
`;

export function ErrorState({ children }) {
    return <StyledError role="alert">{children}</StyledError>;
}

ErrorState.propTypes = {
    children: PropTypes.node,
};
