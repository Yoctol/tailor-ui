import { createGlobalStyle, css } from 'styled-components';
import { rgba } from 'polished';

const tooltipStyles = css`
  :root {
    --reach-tooltip: 1;
  }

  [data-reach-tooltip] {
    position: absolute;
    z-index: 1;
    padding: ${(p) => p.theme.space[2]};
    border-radius: ${(p) => p.theme.radii.lg};
    background-color: ${(p) => rgba(p.theme.colors.gray800, 0.9)};
    color: ${(p) => p.theme.colors.light};
    font-size: ${(p) => p.theme.fontSizes.sm};
    white-space: nowrap;
    pointer-events: none;
  }
`;

export const TooltipStyle = createGlobalStyle`${tooltipStyles}`;
