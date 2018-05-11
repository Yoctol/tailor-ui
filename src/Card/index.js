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
import Button from '../Button';

const CardButton = styled(Button)`
  border: 0;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
  border-radius: 0;

  :last-child {
    border-bottom: 0;
  }

  :focus {
    border: 0;

    &:not(:last-child) {
      border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
    }
  }
`;

CardButton.defaultProps = {
  theme,
};

const CardBlock = styled.div`
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};

  :last-child {
    border-bottom: 0;
  }

  ${space};
  ${fontSize};
`;

CardBlock.propTypes = {
  ...space.propTypes,
};

CardBlock.defaultProps = {
  theme,
  p: 4,
  fontSize: 'default',
};

const CardImage = styled.div`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

CardImage.propTypes = {
  ...space.propTypes,
};

CardImage.defaultProps = {
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

  ${CardButton}:first-child {
    border-top-left-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
    border-top-right-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
  }

  ${CardButton}:last-child {
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

Card.CardButton = CardButton;
Card.CardBlock = CardBlock;
Card.CardImage = CardImage;

export default Card;
