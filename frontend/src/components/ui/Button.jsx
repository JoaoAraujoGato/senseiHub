import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const variants = {
    primary: css`
        background: var(--primary-color);
        color: #fff;
        &:hover { background: var(--primary-hover); }
    `,
    secondary: css`
        background: #2d3f4f;
        color: #fff;
        &:hover { background: #38505f; }
    `,
    ghost: css`
        background: transparent;
        color: #9ca3af;
        &:hover { color: var(--primary-color); background: rgba(197, 58, 44, 0.08); }
    `,
    danger: css`
        background: #b91c1c;
        color: #fff;
        &:hover { background: #991b1b; }
    `,
};

const sizes = {
    sm: css`padding: 0.35rem 0.8rem; font-size: 0.8rem;`,
    md: css`padding: 0.6rem 1.2rem; font-size: 0.9rem;`,
    lg: css`padding: 0.8rem 1.6rem; font-size: 1rem;`,
};

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

    &:focus { outline: none; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }

    ${({ $variant }) => variants[$variant] ?? variants.primary}
    ${({ $size }) => sizes[$size] ?? sizes.md}
`;

export function Button({ variant = 'primary', size = 'md', fullWidth = false, icon, children, ...props }) {
    return (
        <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
            {icon}
            {children}
        </StyledButton>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullWidth: PropTypes.bool,
    icon: PropTypes.node,
    children: PropTypes.node,
};
