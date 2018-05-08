import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  themeGet,
  complexStyle,
  color,
  fontSize,
  space,
  width,
  border,
  borderRadius,
} from 'styled-system';
import { ifProp } from 'styled-tools';

import defaultTheme from '../theme';
import { controlShadow } from '../utils/shadow';

const size = complexStyle({
  prop: 'size',
  key: 'sizes',
});

const theme = {
  ...defaultTheme,
  sizes: {
    s: {
      height: '24px',
      padding: '0 7px',
    },
    m: {
      height: '32px',
      padding: '0 15px',
    },
    l: {
      height: '40px',
      padding: '0 15px',
    },
  },
};

const Button = styled.button`
  width: ${ifProp('fixed', '100%')};
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :focus {
    outline: 0;
    border: ${themeGet('borders.1')} ${themeGet('colors.black')};
    ${props => controlShadow(themeGet('colors.black')(props))}
  }

  :hover {
    background-color: ${themeGet('colors.gray.1')};
  }

  :disabled {
    color: rgba(0,0,0,.25);
    background-color: ${themeGet('colors.gray.1')};
    border-color: ${themeGet('colors.gray.2')};
    cursor: not-allowed;
  }

  ${color} ${fontSize} ${size} ${space} ${width} ${border} ${borderRadius};
`;

Button.propTypes = {
  fixed: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

Button.defaultProps = {
  theme,
  fixed: false,
  fontSize: 1,
  size: 'm',
  color: 'gray.0',
  border: 1,
  borderColor: 'gray.2',
  borderRadius: 2,
};

export default Button;
