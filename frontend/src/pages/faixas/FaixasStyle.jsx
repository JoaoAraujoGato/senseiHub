import styled from 'styled-components'

export const BeltPreview = styled.div`
    width: 80px;
    height: 22px;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    border: 1px solid #e5e7eb;
`

export const BeltPrimary = styled.div`
    flex: 4;  /* 80% */
    background: ${({ $cor }) => $cor};
`

export const BeltSecondary = styled.div`
    flex: 1;  /* 20% */
    background: ${({ $cor }) => $cor};
`
