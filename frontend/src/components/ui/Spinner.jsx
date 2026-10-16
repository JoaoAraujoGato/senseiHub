import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const Circle = styled.span`
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid #2d3f4f;
    border-top-color: var(--primary-color);
    border-radius: 50%;
    display: inline-block;
    animation: ${spin} 0.7s linear infinite;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #6b7280;
    font-size: 0.9rem;
`;

export function Spinner({ label }) {
    return (
        <Wrapper>
            <Circle />
            {label && <span>{label}</span>}
        </Wrapper>
    );
}

Spinner.propTypes = {
    label: PropTypes.string,
};
