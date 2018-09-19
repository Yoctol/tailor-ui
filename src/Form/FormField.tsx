import React, { SFC } from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';

import { StyledInput } from '../Input';
import { StyledTextarea } from '../Input/Textarea';

import Hint from './Hint';

export interface FormFieldProps {
  success: boolean;
  warning: boolean;
  error: boolean;
}

const StyledFormField = styled<FormFieldProps, 'div'>('div')`
  position: relative;
  margin-bottom: ${themeGet('space.2')};

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
    `};
`;

const FormField: SFC<FormFieldProps> = props => <StyledFormField {...props} />;

export default FormField;
