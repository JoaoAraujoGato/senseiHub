import  PropTypes from 'prop-types';
import styled from "styled-components"

const StyledButton = styled.button`
    background-color: ${({ bgColor }) =>
        bgColor || "var(--primary-color)"};
    max-width: ${({ maxWidth }) => maxWidth || "auto"};
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 1rem;
    color: #FFF;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    border-radius: 0.3rem;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: ${({ fontSize }) =>
        fontSize || "1rem"};
    letter-spacing: 0.1rem;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background-color: ${({ bgHoverColor }) =>
            bgHoverColor || "var(--primary-hover)"};
        opacity: 0.9;
    }
`

function Button({
    icon,
    label,
    maxWidth,
    onClick,
    bgColor,
    bgHoverColor,
    fontSize,
    ...props
}) {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <StyledButton
                onClick={onClick}
                bgColor={bgColor}
                bgHoverColor={bgHoverColor}
                maxWidth={maxWidth}
                fontSize={fontSize}
                {...props}
            >
                {icon && (
                    <i className={`bi bi-${icon}`}></i>
                )}

                {label && <span>{label}</span>}
            </StyledButton>
        </div>
    )
}

export default Button;

Button.defaultProps = {
    icon: '',
    onClick: () => {},
    label: '',
    fontSize: '',
    maxWidth: '',
    bgColor: 'var(--primary-color)',
    bgHoverColor: 'var(--primary-hover)',
}

Button.propTypes = {
    icon: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    fontSize: PropTypes.string,
    maxWidth: PropTypes.string,
    bgColor: PropTypes.string,
    bgHoverColor: PropTypes.string,
}
