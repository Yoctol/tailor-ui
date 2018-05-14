import styled from 'styled-components';
import {
  themeGet,
  color,
  space,
  height,
  width,
  borderRadius,
  fontSize,
} from 'styled-system';

import theme from '../theme';
import _Button from '../Button';

const Button = styled(_Button)`
  border: 0;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
  border-radius: 0;

  &:last-child {
    border-bottom: 0;
  }

  &:focus {
    border: 0;

    &:not(:last-child) {
      border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
    }
  }
`;

Button.defaultProps = {
  theme,
};

const Block = styled.div`
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};

  &:last-child {
    border-bottom: 0;
  }

  ${space};
  ${fontSize};
`;

Block.propTypes = {
  ...space.propTypes,
};

Block.defaultProps = {
  theme,
  p: 4,
  fontSize: 'default',
};

const Image = styled.div`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

Image.propTypes = {
  ...space.propTypes,
};

Image.defaultProps = {
  theme,
};

const Card = styled.div`
  display: flex;
  border: ${themeGet('borders.default')} ${themeGet('colors.border')};
  flex-direction: column;

  ${space};
  ${height};
  ${width};
  ${color};
  ${borderRadius};

  ${Button}:first-child {
    border-top-left-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
    border-top-right-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
  }

  ${Button}:last-child {
    border-bottom-left-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
    border-bottom-right-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
  }
`;

Card.propTypes = {
  ...space.propTypes,
  ...height.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...borderRadius.propTypes,
};

Card.defaultProps = {
  theme,
  bg: 'bgLight',
  borderRadius: 1,
};

Card.Button = Button;
Card.Block = Block;
Card.Image = Image;

export default Card;
