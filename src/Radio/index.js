import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, color, borderColor } from 'styled-system';

import { controlShadow } from '../utils/shadow';
import Label from '../Form/Label';

const Radio = styled.input.attrs({
  type: 'radio',
})`
  position: absolute;
  opacity: 0;

  & + ${Label /* sc-selector */} {
    position: relative;
    padding: 0;
    cursor: pointer;
  }

  & + ${Label /* sc-selector */}::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: ${themeGet('space.2')};
    border: ${themeGet('borders.default')};
    border-radius: 999px;
    background: white;
    vertical-align: text-bottom;
    ${borderColor};
  }

  &:focus + ${Label /* sc-selector */}::before {
    ${controlShadow()};
  }

  &:disabled + ${Label /* sc-selector */} {
    opacity: 0.5;
    cursor: auto;
    pointer-events: none;
  }

  &:disabled + ${Label /* sc-selector */}::before {
    opacity: 0.5;
  }

  &:checked + ${Label /* sc-selector */}::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border: solid 1px ${({ bg }) => themeGet(`colors.${bg}`)};
    border-radius: 50%;
    ${color};
  }
`;

Radio.propTypes = {
  disabled: PropTypes.bool,
  ...borderColor.propTypes,
  ...color.propTypes,
};

Radio.defaultProps = {
  disabled: false,
  bg: 'primary',
  borderColor: 'primary',
};

export default Radio;
