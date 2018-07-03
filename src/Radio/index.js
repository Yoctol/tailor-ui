import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, color, borderColor } from 'styled-system';

import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';
import Label from '../Form/Label';

const Radio = styled.input.attrs({
  type: 'radio',
})`
  position: absolute;
  opacity: 0;

  & + ${Label /* sc-selector */} {
    position: relative;
    padding: 0;
    color: ${themeGet('colors.gray.3')};
    cursor: pointer;
  }

  & + ${Label /* sc-selector */}::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: ${themeGet('space.1')};
    border: ${themeGet('borders.default')};
    border-radius: 999px;
    background: white;
    vertical-align: text-bottom;
    ${borderColor};
  }

  & + ${Label /* sc-selector */}::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    ${controlTransition()};
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
