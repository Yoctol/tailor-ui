import styled, { css, keyframes } from 'styled-components';
import { WidthProps, width } from 'styled-system';

export const SelectWrapper: any = styled.div<WidthProps>`
  display: inline-flex;
  cursor: pointer;

  ${width}
`;

export interface StyledSelectOptionProps {
  active: boolean;
  hovered: boolean;
}

export const StyledSelectOption = styled.div<StyledSelectOptionProps>`
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: ${p =>
    p.hovered ? p.theme.colors.primaryLight : p.theme.colors.light};
  color: ${p => {
    if (p.hovered) {
      return p.theme.colors.light;
    }
    if (p.active) {
      return p.theme.colors.primaryLight;
    }
    return p.theme.colors.gray700;
  }};
  font-size: ${p => p.theme.fontSizes.sm};
  cursor: pointer;
`;

export interface StyledSelectProps {
  focused: boolean;
  disabled: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StyledSelect = styled.div<StyledSelectProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray400};
  outline: none;
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray700};
  line-height: ${p => p.theme.lineHeight};
  cursor: pointer;
  appearance: none;

  &:hover {
    border-color: ${p => p.theme.colors.primary};
  }

  ${p =>
    p.focused &&
    css`
      border-color: ${p.theme.colors.primary};
    `}

  ${p =>
    p.disabled &&
    css`
      border-color: ${p.theme.colors.gray400} !important;
      background-color: ${p.theme.colors.gray300};
      cursor: not-allowed;

      input {
        color: ${p.theme.colors.gray500};
      }
    `}

  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    pointer-events: none;

    &::placeholder {
      color: ${p => p.theme.colors.gray400};
    }
  }

  ${({ size = 'md', theme: { paddings, heights, fontSizes } }) => {
    const inputSizeStyles = {
      sm: css`
        height: ${heights.sm};
        padding: 1px ${paddings.xs};

        input {
          font-size: ${fontSizes.sm};
        }
      `,
      md: css`
        height: ${heights.base};
        padding: 4px ${paddings.sm};

        input {
          font-size: ${fontSizes.base};
        }
      `,
      lg: css`
        height: ${heights.lg};
        padding: 6px ${paddings.md};

        input {
          font-size: ${fontSizes.lg};
        }
      `,
    };

    return inputSizeStyles[size];
  }};

  ${p => p.theme.transition /* sc-declaration */};
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  flex: none;
  width: 1em;
  height: 1em;
  margin-right: 8px;
  border: ${p => p.theme.borders.base};
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: ${spin} 0.7s linear infinite;
`;
