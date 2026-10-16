import styled from 'styled-components';

export const Layout = styled.div`
    display: flex;
    min-height: 100vh;
`;

export const Content = styled.div`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
`;

export const Bar = styled.header`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid #1f2830;
    background: #0c131a;
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const Toggle = styled.button`
    background: transparent;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border-radius: 0.4rem;
    transition: 0.2s ease;

    &:hover { color: #fff; background: #1f2830; }
    &:focus { outline: none; }
`;

export const Titulo = styled.h2`
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
`;
