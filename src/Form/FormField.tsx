import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import tag from 'utils/CleanTag';

import { StyledInput } from '../Input';
import { StyledTextarea } from '../Input/Textarea';

import Hint from './Hint';

export interface IFormFieldProps {
  success?: boolean;
  warning?: boolean;
  error?: boolean;
}

const StyledFormField = styled(tag.div)<IFormFieldProps>`
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

const FormField: FunctionComponent<IFormFieldProps> = props => (
  <StyledFormField {...props} />
);

export default FormField;
