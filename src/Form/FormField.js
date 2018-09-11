import React from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';

import { StyledInput } from '../Input';
import { StyledTextarea } from '../Input/Textarea';

import Hint from './Hint';
import Label from './Label';

const StyledFormField = styled.div`
  position: relative;
  margin-top: ${themeGet('space.3')};
  padding-bottom: ${themeGet('space.5')};

  ${({ success }) =>
    success &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${themeGet('colors.success')};
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
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
    `};

  ${({ warning }) =>
    warning &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${themeGet('colors.warning')};
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
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
    `};

  ${({ error }) =>
    error &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${themeGet('colors.error')};
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
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
    `};
`;

const FormField = props => <StyledFormField {...props} />;

export default FormField;
