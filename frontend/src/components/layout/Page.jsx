import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: 2rem;
    max-width: 100%;
`;

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    border-bottom: 1px solid #1f2830;
`;

export const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    p {
        font-size: 0.9rem;
        color: #6b7280;
        margin: 0;
    }
`;
