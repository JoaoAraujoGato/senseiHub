import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const tones = {
    neutral: css`background: #2d3f4f; color: #9ca3af;`,
    success: css`background: rgba(34, 197, 94, 0.15); color: #4ade80;`,
    danger: css`background: rgba(239, 68, 68, 0.15); color: #f87171;`,
};

const StyledBadge = styled.span`
    display: inline-block;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;

    ${({ $tone }) => tones[$tone] ?? tones.neutral}
`;

export function Badge({ tone = 'neutral', children }) {
    return <StyledBadge $tone={tone}>{children}</StyledBadge>;
}

Badge.propTypes = {
    tone: PropTypes.oneOf(['neutral', 'success', 'danger']),
    children: PropTypes.node,
};
