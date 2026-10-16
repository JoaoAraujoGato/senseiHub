import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    padding: 0.6rem 0.9rem;
    border: 1px solid #2d3f4f;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    outline: none;
    background: #0c131a;
    color: #fff;

    &::placeholder { color: #6b7280; }
    &:focus { border-color: var(--primary-color); }
`;
