import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, width, space, textAlign } from 'styled-system';
import { ifProp } from 'styled-tools';

import { sizes } from '../utils/system';
import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';

const Input = styled.input`
  display: block;
  position: relative;
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
    opacity: 0.5;
    background-color: ${themeGet('colors.bgDark')};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${themeGet('colors.gray.4')};
  }

  ${controlTransition()};

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
  ${textAlign};
`;

Input.propTypes = {
  size: PropTypes.string.isRequired,
  ...width.propTypes,
  ...space.propTypes,
  ...textAlign.propTypes,
};

Input.defaultProps = {
  size: 'm',
};

export default Input;
