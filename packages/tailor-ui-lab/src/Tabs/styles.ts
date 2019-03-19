import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { rgba } from 'polished';

export const StyledTab = styled.a`
  display: inline-flex;
  position: relative;
  align-items: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  ${p => p.theme.transition /* sc-declaration */};
`;

export const TabLine = styled(animated.div)`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 3px;
  border-radius: ${p => p.theme.radii.base};
  background-color: ${p => rgba(p.theme.colors.primaryDark, 0.5)};
`;

export const TabActiveLine = styled(animated.div)`
  position: absolute;
  z-index: 10;
  bottom: 0;
  height: 3px;
  border-radius: ${p => p.theme.radii.base};
  background-color: ${p => p.theme.colors.secondary};
`;

export type Size = 'sm' | 'md' | 'lg';
export type Type = 'line' | 'card';

export interface StyledTabsProps {
  type: Type;
  size: Size;
}

export const StyledTabs = styled.nav<StyledTabsProps>`
  display: flex;
  position: relative;

  ${p =>
    p.type === 'card'
      ? css`
          ${StyledTab} {
            background-color: ${p.theme.colors.primaryLight2};
            color: ${p.theme.colors.gray500};

            &:hover {
              color: ${p.theme.colors.primaryLight};
            }

            &:active {
              color: ${p.theme.colors.primary};
            }

            &:first-child {
              border-top-left-radius: ${p.theme.radii.xl};
            }

            &:last-child {
              border-top-right-radius: ${p.theme.radii.xl};
            }

            &.active {
              z-index: 1;
              background-color: ${p.theme.colors.light};
              color: ${p.theme.colors.primaryLight};
              box-shadow: 0px -2px 4px -4px rgba(100, 120, 168, 0.3),
                4px 0px 4px -4px rgba(100, 120, 168, 0.3),
                -4px 0px 4px -4px rgba(100, 120, 168, 0.3);
            }
          }

          ${StyledTab}:not(.active) + ${StyledTab}:not(.active)::before {
            content: '';
            position: absolute;
            left: 0;
            width: 2px;
            height: ${p.theme.fontSizes[p.size === 'md' ? 'base' : p.size]};
            background-color: ${p.theme.colors.gray500};

            ${p.theme.transition}
          }
        `
      : css`
          ${StyledTab} {
            background-color: transparent;
            color: ${p.theme.colors.gray300};

            &:hover {
              color: ${p.theme.colors.light};
            }

            &:active {
              color: ${p.theme.colors.secondary};
            }
          }
        `}

  ${StyledTab} {
    ${p =>
      ({
        sm: css`
          height: 40px;
          padding: 0 20px;
          font-size: ${p.theme.fontSizes.sm};
        `,
        md: css`
          height: 48px;
          padding: 0 24px;
          font-size: ${p.theme.fontSizes.base};
        `,
        lg: css`
          height: 56px;
          padding: 0 28px;
          font-size: ${p.theme.fontSizes.lg};
        `,
      }[p.size])};
  }
`;
