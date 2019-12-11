import styled, { css, keyframes } from 'styled-components';

export const SelectWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

export interface StyledSelectOptionProps {
  active: boolean;
  hovered: boolean;
}

export const StyledSelectOption = styled.div<StyledSelectOptionProps>`
  display: flex;
  align-items: center;
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

  > div {
    padding: 0 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const StyledSelectedOption = styled.div`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 26px;
  margin-right: 8px;
  padding: 0 8px;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.primaryLight};
  background-color: ${p => p.theme.colors.surface2};
  color: ${p => p.theme.colors.primaryLight};
  font-size: ${p => p.theme.fontSizes.sm};

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    fill: ${p => p.theme.colors.primaryLight2};
  }

  &:hover svg {
    fill: ${p => p.theme.colors.primaryLight};
  }
`;

export interface StyledSelectProps {
  focused: boolean;
  disabled: boolean;
  invalid: boolean;
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
      p.invalid &&
      css`
        border-color: ${p.theme.colors.danger} !important;
      `}

  ${p =>
    p.disabled &&
    css`
      border-color: ${p.theme.colors.gray400};
      background-color: ${p.theme.colors.gray300};
      cursor: not-allowed;

      &:hover {
        border-color: ${p.theme.colors.gray400};
      }

      input {
        color: ${p.theme.colors.gray500};
      }

      ${StyledSelectedOption} {
        border-color: ${p.theme.colors.gray400};
        background-color: ${p.theme.colors.gray200};
        color: ${p.theme.colors.gray400};
        pointer-events: none;
      }
    `}

  input {
    flex: 1;
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    background-color: transparent;
    text-overflow: ellipsis;
    pointer-events: none;

    &::placeholder {
      color: ${p => p.theme.colors.gray400};
    }
  }

  ${({ size = 'md', theme: { paddings, heights, fontSizes } }) => {
    const inputSizeStyles = {
      sm: css`
        min-height: ${heights.sm};
        padding: 1px ${paddings.xs};

        input {
          font-size: ${fontSizes.sm};
        }
      `,
      md: css`
        min-height: ${heights.base};
        padding: 4px ${paddings.sm};

        input {
          font-size: ${fontSizes.base};
        }
      `,
      lg: css`
        min-height: ${heights.lg};
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
  width: 24px;
  height: 24px;
  margin: 4px;
  border: ${p => p.theme.borders.base};
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: ${spin} 0.7s linear infinite;
`;
