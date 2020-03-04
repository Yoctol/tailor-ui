import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { StyledInput } from '../Input/styles';
import { StyledTextarea } from '../Input/Textarea';

export const MaxLength = styled.div`
  position: absolute;
  right: -1px;
  bottom: -2px;
  padding: 1px 5px;
  border: ${(p) => p.theme.borders.base};
  border-radius: 999px;
  border-color: ${(p) => p.theme.colors.primary};
  opacity: 0;
  background-color: #fff;
  font-size: ${rem('10px')};
  line-height: 1;
`;

export const TextFieldContainer = styled.div<{
  invalid: boolean;
  empty: boolean;
}>`
  position: relative;
  margin-top: 10px;

  ${StyledInput /* sc-selector */}, ${StyledTextarea /* sc-selector */} {
    & ~ label {
      position: absolute;
      line-height: 1;
      pointer-events: none;

      ${(p) =>
        p.empty
          ? css`
              top: 9px;
              left: 1px;
              padding: 0 ${p.theme.paddings.xs};
              color: ${p.theme.colors.gray400};
              font-size: ${p.theme.fontSizes.base};
            `
          : css`
              top: -7px;
              left: 7px;
              padding: 0 2px;
              background-color: #fff;
              color: ${p.invalid
                ? p.theme.colors.danger
                : p.theme.colors.primary};
              font-size: 0.75rem;
            `}

      ${(p) => p.theme.transition};
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  ${StyledInput /* sc-selector */}:focus, ${StyledTextarea /* sc-selector */}:focus {
    & ~ label {
      top: -7px;
      left: 7px;
      padding: 0 2px;
      background-color: #fff;
      color: ${(p) =>
        p.invalid ? p.theme.colors.danger : p.theme.colors.primary};
      font-size: 0.75rem;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    & ~ ${MaxLength /* sc-selector */} {
      opacity: 1;
    }
  }
`;
