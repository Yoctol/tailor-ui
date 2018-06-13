import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { themeGet } from 'styled-system';

import { controlShadow } from '../utils/shadow';

import Input from './Input';
import Hint from './Hint';

const FormField = styled.div`
  position: relative;
  margin-top: ${themeGet('space.2')};
  padding-bottom: ${themeGet('space.2')};

  ${ifProp(
    'success',
    css`
      & ${Input /* sc-selector */} {
        border-color: ${themeGet('colors.success')};

        :focus {
          ${controlShadow(themeGet('colors.success'))};
        }
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${themeGet('colors.success')};
      }
    `
  )};

  ${ifProp(
    'warning',
    css`
      & ${Input /* sc-selector */} {
        border-color: ${themeGet('colors.warning')};

        :focus {
          ${controlShadow(themeGet('colors.warning'))};
        }
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${themeGet('colors.warning')};
      }
    `
  )};

  ${ifProp(
    'error',
    css`
      & ${Input /* sc-selector */} {
        border-color: ${themeGet('colors.error')};

        :focus {
          ${controlShadow(themeGet('colors.error'))};
        }
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${themeGet('colors.error')};
      }
    `
  )};
`;

export default FormField;
