import styled from 'styled-components';
import { themeGet, color, space, borderRadius } from 'styled-system';

import theme from '../theme';

const Card = styled.div`
  display: flex;
  overflow: hidden;
  border: ${themeGet('borders.default')} ${themeGet('colors.border')};
  flex-direction: column;
  ${color} ${borderRadius};
`;

Card.defaultProps = {
  theme,
  bg: 'bgLight',
  borderRadius: 1,
};

const CardBlock = styled.div`
  overflow: hidden;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};

  :last-child {
    border-bottom: 0;
  }

  ${space};
`;

CardBlock.defaultProps = {
  theme,
  p: 4,
};

const CardImage = styled.div`
  overflow: hidden;

  :first-child {
    padding-top: 0;

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

CardImage.defaultProps = {
  theme,
  py: 4,
};

Card.CardBlock = CardBlock;
Card.CardImage = CardImage;

export default Card;
