import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, color, borderColor } from 'styled-system';

import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';
import Label from '../Form/Label';

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  opacity: 0;

  & + ${Label /* sc-selector */} {
    position: relative;
    padding: 0;
    font-size: 0.8rem;
    cursor: pointer;
  }

  & + ${Label /* sc-selector */}::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: ${themeGet('space.2')};
    border: ${themeGet('borders.default')};
    border-radius: ${themeGet('radii.1')};
    background: white;
    vertical-align: text-bottom;
    ${controlTransition()};
    ${borderColor};
  }

  &:focus + ${Label /* sc-selector */}::before {
    ${controlShadow()};
  }

  &:checked + ${Label /* sc-selector */}::before {
    ${color};
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
    left: 7px;
    width: 7px;
    height: 11px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  ...borderColor.propTypes,
  ...color.propTypes,
};

Checkbox.defaultProps = {
  disabled: false,
  bg: 'primary',
  borderColor: 'primary',
};

export default Checkbox;
