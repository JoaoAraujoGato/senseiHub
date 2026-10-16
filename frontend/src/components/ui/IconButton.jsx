import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIconButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #6b7280;
    display: inline-flex;
    align-items: center;
    padding: 0.3rem;
    border-radius: 0.3rem;
    transition: 0.2s ease;

    &:hover { color: var(--primary-color); background: rgba(197, 58, 44, 0.08); }
    &:focus { outline: none; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export function IconButton({ children, ...props }) {
    return <StyledIconButton type="button" {...props}>{children}</StyledIconButton>;
}

IconButton.propTypes = {
    children: PropTypes.node,
};
