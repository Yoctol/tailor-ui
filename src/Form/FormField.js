import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { themeGet } from 'styled-system';

import Hint from './Hint';
import Input from './Input';
import Label from './Label';

const FormField = styled.div`
  position: relative;
  margin-top: ${themeGet('space.3')};
  padding-bottom: ${themeGet('space.5')};

  ${ifProp(
    'success',
    css`
      & ${Input /* sc-selector */} {
        border-color: ${themeGet('colors.success')};
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${themeGet('colors.success')};
      }

      /* stylelint-disable-next-line */
      & ${Label /* sc-selector */} {
        color: ${themeGet('colors.success')};
      }
    `
  )};

  ${ifProp(
    'warning',
    css`
      & ${Input /* sc-selector */} {
        border-color: ${themeGet('colors.warning')};
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${themeGet('colors.warning')};
      }

      /* stylelint-disable-next-line */
      & ${Label /* sc-selector */} {
        color: ${themeGet('colors.warning')};
      }
    `
  )};

  ${ifProp(
    'error',
    css`
      & ${Input /* sc-selector */} {
        border-color: ${themeGet('colors.error')};
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${themeGet('colors.error')};
      }

      /* stylelint-disable-next-line */
      & ${Label /* sc-selector */} {
        color: ${themeGet('colors.error')};
      }
    `
  )};
`;

export default FormField;
