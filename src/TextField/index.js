import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Input as PowerplugInput, composeEvents } from 'react-powerplug';
import { rem } from 'polished';

import FormField from '../Form/FormField';
import Hint from '../Form/Hint';
import Input, { StyledInput } from '../Input';
import Textarea, { StyledTextarea } from '../Input/Textarea';

const TextFieldLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 7px;
  padding: 0 2px;
  background-color: #fff;
  color: ${p => p.theme.colors.gray[3]};
  font-size: 0.75rem;
  pointer-events: none;

  ${p => p.theme.transition};
`;

const MaxLength = styled.div`
  position: absolute;
  right: -1px;
  bottom: -2px;
  padding: 1px 5px;
  border: ${p => p.theme.borders.base};
  border-radius: 999px;
  border-color: ${p => p.theme.colors.primary};
  opacity: 0;
  background-color: #fff;
  font-size: ${rem('10px')};
  line-height: 1;
`;

const TextFieldField = styled(FormField)`
  margin-top: 6px;

  ${StyledInput /* sc-selector */}:invalid, ${StyledTextarea /* sc-selector */}:invalid {
    box-shadow: none;

    & ~ ${TextFieldLabel /* sc-selector */} {
      top: 3px;
      left: 1px;
      padding: 0 ${p => p.theme.paddings.xs};
      color: ${p => p.theme.colors.gray[6]};
      font-size: ${p => p.theme.fontSizes.base};
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  ${StyledInput /* sc-selector */}:focus, ${StyledTextarea /* sc-selector */}:focus {
    & ~ ${TextFieldLabel /* sc-selector */} {
      top: -10px;
      left: 7px;
      padding: 0 2px;
      background-color: #fff;
      color: ${p => p.theme.colors.gray[3]};
      font-size: 0.75rem;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    & ~ ${MaxLength /* sc-selector */} {
      opacity: 1;
    }
  }
`;

const TextField = ({
  label,
  value: controlledValue,
  defaultValue,
  success,
  warning,
  error,
  message,
  maxLength,
  textarea,
  ...props
}) => (
  <PowerplugInput initial={defaultValue}>
    {({ value: uncontrolledValue, bind: { onChange } }) => {
      const value =
        controlledValue || controlledValue === ''
          ? controlledValue
          : uncontrolledValue;
      const hasHint = success || warning || error;
      const RenderComponent = textarea ? Textarea : Input;
      const inputProps = {
        maxLength,
        value,
        ...props,
        ...composeEvents(props, {
          onChange,
        }),
      };

      return (
        <TextFieldField success={success} warning={warning} error={error}>
          <RenderComponent {...inputProps} required />
          {maxLength &&
            !hasHint && <MaxLength>{maxLength - value.length}</MaxLength>}
          {label && <TextFieldLabel>{label}</TextFieldLabel>}
          {hasHint && <Hint>{message}</Hint>}
        </TextFieldField>
      );
    }}
  </PowerplugInput>
);

TextField.propTypes = {
  /**
   * Set the textfield status to error
   */
  error: PropTypes.bool,
  /**
   * The label text
   */
  label: PropTypes.string,
  /**
   * The content max length of textfield
   */
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The message will show when success or warning or error is true
   */
  message: PropTypes.string,
  /**
   * Set the textfield status to success
   */
  success: PropTypes.bool,
  /**
   * Whether the input is a textarea
   */
  textarea: PropTypes.bool,
  /**
   * Set the textfield status to warning
   */
  warning: PropTypes.bool,
};

TextField.defaultProps = {
  error: false,
  message: null,
  label: null,
  maxLength: null,
  success: false,
  textarea: false,
  warning: false,
};

export default TextField;
