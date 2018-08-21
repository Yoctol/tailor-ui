import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import {
  Compose,
  Focus,
  Input as PowerplugInput,
  composeEvents,
} from 'react-powerplug';
import { ifProp } from 'styled-tools';
import { rem } from 'polished';
import { themeGet } from 'styled-system';

import FormField from '../Form/FormField';
import Hint from '../Form/Hint';
import Input from '../Input';
import Label from '../Form/Label';
import Textarea from '../Input/Textarea';

const TextFieldLabel = styled(Label)`
  position: absolute;
  top: -8px;
  left: 6px;
  padding: 0 4px;
  background-color: #fff;
  color: ${themeGet('colors.gray.6')};
  font-size: ${themeGet('fontSizes.default')};
  transform: translate(0, 20px) scale(1);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  pointer-events: none;

  ${ifProp(
    'shrink',
    css`
      color: ${themeGet('colors.gray.3')};
      transform: translate(-6px, 0) scale(0.8);
    `
  )};
`;

const MaxLength = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: ${ifProp('visible', 1, 0)};
  color: ${themeGet('colors.gray.6')};
  font-size: ${rem('10px')};
  transition: opacity 200ms ease;
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
  <Compose
    components={[
      Focus,
      // eslint-disable-next-line react/prop-types
      <PowerplugInput initial={defaultValue} />,
    ]}
  >
    {(
      { focused, bind: focusBind },
      { value: uncontrolledValue, bind: { onChange } }
    ) => {
      const value = controlledValue || uncontrolledValue;
      const hasValue = value !== '';
      const actived = focused || hasValue;
      const hasHint = success || warning || error;
      const RenderComponent = textarea ? Textarea : Input;
      const inputProps = {
        maxLength,
        value,
        ...props,
        ...composeEvents(props, {
          ...focusBind,
          onChange,
        }),
      };

      return (
        <FormField success={success} warning={warning} error={error}>
          {label && <TextFieldLabel shrink={actived}>{label}</TextFieldLabel>}
          {maxLength &&
            !hasHint && (
              <MaxLength visible={actived}>
                {maxLength - value.length}
              </MaxLength>
            )}
          <RenderComponent {...inputProps} />
          {hasHint && <Hint>{message}</Hint>}
        </FormField>
      );
    }}
  </Compose>
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
