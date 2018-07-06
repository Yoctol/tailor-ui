import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, width, space, textAlign } from 'styled-system';

import { sizes } from '../utils/system';
import controlTransition from '../utils/transition';

const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 100%;
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
  border-radius: ${themeGet('radii.1')};
  outline: none;
  background: ${themeGet('light')};
  background-image: none;
  color: ${themeGet('colors.gray.2')};
  line-height: ${themeGet('lineHeight')};
  appearance: none;

  &:focus {
    border-color: ${themeGet('colors.gray.3')};
  }

  &:disabled,
  [disabled] {
    opacity: 0.5;
    background-color: ${themeGet('colors.gray.8')};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${themeGet('colors.gray.6')};
    font-size: 0.8rem;
  }

  ${controlTransition()};

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
