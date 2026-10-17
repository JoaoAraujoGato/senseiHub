import styled from 'styled-components'

// ─── Modal base ───────────────────────────────────────────────────────────────
export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`

export const Modal = styled.div`
    background: #1f2830;
    border: 1px solid #535353;
    border-radius: 0.75rem;
    padding: 2rem;
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #535353;
    align-items: center;
`

export const ModalTitle = styled.h2`
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
`

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    &:hover { color: #000; }
    &:focus { outline: none; }
`

export const ColorRow = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
`

// ─── ColorPickerField ─────────────────────────────────────────────────────────

export const ColorPickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`

export const ColorPickerLabel = styled.label`
    font-size: 0.85rem;
    font-weight: 600;
    color: #fcfcfc;

    small {
        font-weight: 400;
        color: #6b7280;
    }
`

export const ColorPickerRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`

export const ColorCircle = styled.button`
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 3px solid ${({ $cor }) => $cor ?? '#535353'};
    background: ${({ $cor }) => $cor ?? 'transparent'};
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    position: relative;
    flex-shrink: 0;

    input[type="color"] {
        position: absolute;
        inset: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border: none;
        padding: 0;
    }

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 0 4px ${({ $cor }) => $cor ? `${$cor}44` : 'transparent'};
    }

    &:focus { outline: none; }
`

export const ColorCircleEmpty = styled(ColorCircle)`
    background: repeating-conic-gradient(#3a3a3a 0% 25%, #1f2830 0% 50%) 0 0 / 8px 8px;
    border: 2px dashed #535353;

    &:hover {
        border-color: #C53A2C;
        box-shadow: 0 0 0 4px rgba(197, 58, 44, 0.15);
    }
`

export const ColorHexValue = styled.span`
    font-size: 0.78rem;
    font-family: monospace;
    color: #9ca3af;
    letter-spacing: 0.05em;
`

export const ColorClearButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #6b7280;
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
    transition: color 0.15s ease, background 0.15s ease;
    line-height: 1;

    &:hover {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }
    &:focus { outline: none; }
`

export const ColorErrorMsg = styled.span`
    font-size: 0.75rem;
    color: #ef4444;
`