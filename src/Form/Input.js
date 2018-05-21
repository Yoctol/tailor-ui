import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, width, space } from 'styled-system';
import { ifProp } from 'styled-tools';

import { sizes } from '../utils/system';
import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';
import theme from '../theme';

const Input = styled.input`
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  border: ${themeGet('borders.default')} ${themeGet('colors.borderDark')};
  border-radius: ${themeGet('radii.1')};
  outline: none;
  background: ${themeGet('bgLight')};
  background-image: none;
  color: ${themeGet('colors.bodyFont')};
  line-height: ${themeGet('lineHeight')};
  appearance: none;

  &:focus {
    border-color: ${themeGet('colors.secondaryDark')};
    ${controlShadow(themeGet('colors.secondaryDark'))};
  }

  &:disabled,
  [disabled] {
    cursor: not-allowed;
    background-color: ${themeGet('colors.bgDark')};
    opacity: 0.5;
  }

  &::placeholder {
    color: ${themeGet('colors.gray.4')};
  }

  ${controlTransition()};

  ${ifProp(
    'success',
    css`
      border-color: ${themeGet('colors.success')};
      &:focus {
        border-color: ${themeGet('colors.success')};
        ${controlShadow(themeGet('colors.success'))};
      }
    `
  )};
  ${ifProp(
    'warning',
    css`
      border-color: ${themeGet('colors.warning')};
      &:focus {
        border-color: ${themeGet('colors.warning')};
        ${controlShadow(themeGet('colors.warning'))};
      }
    `
  )};
  ${ifProp(
    'error',
    css`
      border-color: ${themeGet('colors.error')};
      &:focus {
        border-color: ${themeGet('colors.error')};
        ${controlShadow(themeGet('colors.error'))};
      }
    `
  )};

  ${ifProp(
    'inline',
    css`
      display: inline-block;
      width: auto;
      vertical-align: middle;
    `
  )};

  ${sizes};
  ${width};
  ${space};
`;

Input.propTypes = {
  size: PropTypes.string.isRequired,
  ...width.propTypes,
  ...space.propTypes,
};

Input.defaultProps = {
  theme,
  size: 'm',
};

export default Input;
