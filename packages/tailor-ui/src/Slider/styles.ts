import styled, { css } from 'styled-components';

export const StyledSliderBar = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 4px;
  border-radius: ${p => p.theme.radii.sm};
  background-color: ${p => p.theme.colors.gray200};
  transition: background-color 200ms ease 0s;
  user-select: none;
`;

export const StyledSliderActiveBar = styled.div`
  position: absolute;
  z-index: 1;
  height: 4px;
  border-radius: ${p => p.theme.radii.sm};
  background-color: ${p => p.theme.colors.secondaryLight};
  transition: background-color 200ms ease 0s;
  user-select: none;
`;

export const StyledSliderContainer = styled.div<{
  min: number;
  max: number;
}>`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  padding: 16px 8px 20px;
  user-select: none;

  &::before {
    content: '${p => p.min}';
    position: absolute;
    top: 0;
    left: 4px;
    color: ${p => p.theme.colors.gray500};
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  &::after {
    content: '${p => p.max}';
    position: absolute;
    top: 0;
    right: 4px;
    color: ${p => p.theme.colors.gray500};
    font-size: 12px;
    letter-spacing: 0.2px;
  }
`;

export const StyledSliderDot = styled.span`
  position: absolute;
  z-index: 2;
  width: 12px;
  height: 12px;
  border: ${p => p.theme.borders.lg};
  border-radius: 50%;
  border-color: ${p => p.theme.colors.light};
  background-color: ${p => p.theme.colors.primary};
  transform: translate3d(2px, 2px, 0);
  cursor: pointer;
  user-select: none;
`;

export const StyledSliderDotNumber = styled.span`
  display: inline-flex;
  position: absolute;
  top: 20px;
  justify-content: center;
  width: 100%;
  color: ${p => p.theme.colors.gray500};
  font-size: ${p => p.theme.fontSizes.sm};
  line-height: 1;
  transition: font-size, color 200ms ease 0s;
  pointer-events: none;
`;

export const StyledDotContainer = styled.div<{ active: boolean }>`
  position: absolute;
  z-index: 2;
  width: 16px;
  height: 36px;
  transform: translate3d(-8px, -6px, 0);

  ${p =>
    p.active &&
    css`
      ${StyledSliderDot} {
        width: 16px;
        height: 16px;
        transform: translate3d(0, 0, 0);
      }
      ${StyledSliderDotNumber} {
        color: ${p.theme.colors.gray700};
        font-size: 18px;
        font-weight: 600;
      }
    `}
`;

export const StyledSlider = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 100%;
  height: 12px;
  padding: 4px 0;
  cursor: pointer;
  user-select: none;

  ${p =>
    p.disabled
      ? css`
          cursor: not-allowed;

          ${StyledSliderActiveBar} {
            background-color: ${p.theme.colors.gray300};
          }

          ${StyledSliderDot} {
            background-color: ${p.theme.colors.gray300};
            cursor: not-allowed;
          }
        `
      : css`
          &:hover {
            ${StyledSliderBar} {
              background-color: ${p.theme.colors.gray300};
            }
            ${StyledSliderActiveBar} {
              background-color: ${p.theme.colors.primary};
            }
          }

          ${StyledDotContainer}:hover {
            ${StyledSliderDot} {
              width: 16px;
              height: 16px;
              transform: translate3d(0, 0, 0);
            }
          }
        `}
`;
