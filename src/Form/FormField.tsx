import React, { SFC } from 'react';

import styled, { css } from 'utils/styled-components';

import { StyledInput } from '../Input';
import { StyledTextarea } from '../Input/Textarea';

import Hint from './Hint';

export interface FormFieldProps {
  success?: boolean;
  warning?: boolean;
  error?: boolean;
}

const StyledFormField = styled<FormFieldProps, 'div'>('div')`
  position: relative;
  margin-bottom: ${p => p.theme.space[2]};

  ${({ success }) =>
    success &&
    css`
      & ${StyledInput /* sc-selector */} {
        border-color: ${p => p.theme.colors.success};
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
        border-color: ${p => p.theme.colors.success};
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
        border-color: ${p => p.theme.colors.warning};
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
        border-color: ${p => p.theme.colors.warning};
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
        border-color: ${p => p.theme.colors.error};
      }

      /* stylelint-disable-next-line */
      & ${StyledTextarea /* sc-selector */} {
        border-color: ${p => p.theme.colors.error};
      }

      /* stylelint-disable-next-line */
      & ${Hint /* sc-selector */} {
        color: ${p => p.theme.colors.error};
      }
    `};
`;

const FormField: SFC<FormFieldProps> = props => <StyledFormField {...props} />;

export default FormField;
