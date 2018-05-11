import styled from 'styled-components';
import {
  themeGet,
  color,
  space,
  height,
  borderRadius,
  fontSize,
} from 'styled-system';

import theme from '../theme';
import Button from '../Button';

const Card = styled.div`
  display: flex;
  border: ${themeGet('borders.default')} ${themeGet('colors.border')};
  flex-direction: column;
  ${space};
  ${height};
  ${color};
  ${borderRadius};
`;

Card.propTypes = {
  ...space.propTypes,
  ...height.propTypes,
  ...color.propTypes,
  ...borderRadius.propTypes,
};

Card.defaultProps = {
  theme,
  bg: 'bgLight',
  borderRadius: 1,
};

const CardBlock = styled.div`
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};

  :last-child {
    border-bottom: 0;
  }

  ${Button} {
    border: 0;
    border-radius: 0;
    ${Button}:focus {
      border: 0;
    }
  }

  ${space};
  ${fontSize};

  ${Button} & {
    margin: 0;
  }
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
  }

  :first-child {
    img {
      border-top-left-radius: ${themeGet('radii.0')};
      border-top-right-radius: ${themeGet('radii.0')};
    }
  }

  :last-child {
    img {
      border-bottom-left-radius: ${themeGet('radii.0')};
      border-bottom-right-radius: ${themeGet('radii.0')};
    }
  }

  ${space};
`;

CardImage.propTypes = {
  ...space.propTypes,
};

CardImage.defaultProps = {
  theme,
};

Card.CardBlock = CardBlock;
Card.CardImage = CardImage;

export default Card;
