import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  complexStyle,
  color,
  fontSize,
  space,
  width,
  border,
  borderRadius,
} from 'styled-system';

import defaultTheme from '../theme';

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
  width: ${props => (props.fixed ? '100%' : 'auto')};
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :focus {
    outline: 0;
    border: ${props => props.theme.borders[1]} ${props =>
  props.theme.colors.black};
  }

  :hover {
    background-color: ${props => props.theme.colors.gray[1]};
  }

  :disabled {
    color: rgba(0,0,0,.25);
    background-color: ${props => props.theme.colors.gray[1]};
    border-color: ${props => props.theme.colors.gray[2]};
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
  color: 'text',
  border: 1,
  borderColor: 'gray.2',
  borderRadius: 2,
};

export default Button;
