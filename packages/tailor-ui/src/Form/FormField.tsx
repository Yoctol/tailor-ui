import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import tag from '../utils/CleanTag';
import { StyledInput } from '../Input';
import { StyledTextarea } from '../Input/Textarea';

import Hint from './Hint';

export interface FormFieldProps {
  success?: boolean;
  warning?: boolean;
  error?: boolean;
}

const StyledFormField = styled(tag.div)<FormFieldProps>`
  position: relative;
  margin-bottom: ${p => p.theme.space[2]};

  ${({ success }) =>
    success &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${p => p.theme.colors.success} !important;
        box-shadow: none !important;
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
        border-color: ${p => p.theme.colors.success} !important;
        box-shadow: none !important;
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${p => p.theme.colors.success};
      }
    `};

  ${({ warning }) =>
    warning &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${p => p.theme.colors.warning} !important;
        box-shadow: none !important;
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
        border-color: ${p => p.theme.colors.warning} !important;
        box-shadow: none !important;
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${p => p.theme.colors.warning};
      }
    `};

  ${({ error }) =>
    error &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${p => p.theme.colors.danger} !important;
        box-shadow: none !important;
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
        border-color: ${p => p.theme.colors.danger} !important;
        box-shadow: none !important;
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${p => p.theme.colors.danger};
      }
    `};
`;

const FormField: FunctionComponent<FormFieldProps> = props => (
  <StyledFormField {...props} />
);

export default FormField;
