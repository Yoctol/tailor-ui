import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Focus } from 'react-powerplug';
import { ifProp } from 'styled-tools';
import { rem } from 'polished';
import { themeGet } from 'styled-system';

import FormField from './FormField';
import Hint from './Hint';
import Input from './Input';
import Label from './Label';
import Textarea from './Textarea';

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

const MaxLenght = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: ${ifProp('visible', 1, 0)};
  color: ${themeGet('colors.gray.6')};
  font-size: ${rem('10px')};
  transition: opacity 200ms ease;
`;

const TextField = ({
  value,
  onChange,
  label,
  success,
  warning,
  error,
  message,
  maxLength,
  textarea,
  ...props
}) => (
  <Focus>
    {({ focused, bind }) => {
      const actived = focused || value !== '';
      const hasMaxLength = maxLength !== 0;
      const hasError = success || warning || error;
      const inputProps = {
        value,
        onChange,
        maxLength: hasMaxLength ? maxLength : undefined,
        ...props,
        ...bind,
      };
      const RenderComponent = textarea ? Textarea : Input;

      return (
        <FormField success={success} warning={warning} error={error}>
          <TextFieldLabel shrink={actived}>{label}</TextFieldLabel>
          {hasMaxLength &&
            !hasError && (
              <MaxLenght visible={actived}>
                {maxLength - value.length}
              </MaxLenght>
            )}
          <RenderComponent {...inputProps} />
          {hasError && <Hint>{message}</Hint>}
        </FormField>
      );
    }}
  </Focus>
);

TextField.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  message: PropTypes.string,
  success: PropTypes.bool,
  textarea: PropTypes.bool,
  value: PropTypes.string,
  warning: PropTypes.bool,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  error: false,
  message: '',
  maxLength: 0,
  success: false,
  textarea: false,
  value: '',
  warning: false,
  onChange: () => {},
};

export default TextField;
