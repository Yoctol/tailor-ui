import React, { FunctionComponent } from 'react';

import { CardProps, CardWrapper, StyledBlock, StyledImage } from './styles';

const Card: FunctionComponent<CardProps> & {
  Block: typeof StyledBlock;
  Image: typeof StyledImage;
} = props => <CardWrapper clickable={!!props.onClick} {...props} />;

Card.Block = StyledBlock;
Card.Image = StyledImage;

Card.defaultProps = {
  bg: 'light',
  borderRadius: 'lg',
  borderColor: 'gray300',
};

export default Card;
