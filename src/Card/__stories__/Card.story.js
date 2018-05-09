import React from 'react';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

import Card from '../';
import Button from '../../Button';

const { CardBlock, CardImage } = Card;

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <div style={{ width: 400 }}>{children}</div>;

storiesOf('Card', module)
  .addDecorator(centered)
  .add('with text', () => (
    <Wrapper>
      <Card>
        <CardBlock>Title</CardBlock>
        <CardBlock>Content</CardBlock>
        <CardBlock>Footer</CardBlock>
      </Card>
    </Wrapper>
  ))
  .add('with Button', () => (
    <Wrapper>
      <Card>
        <CardBlock>Title</CardBlock>
        <CardBlock>Content</CardBlock>
        <CardBlock p={0}>
          <Button border={0} borderRadius={0} block size="lg">
            With Button
          </Button>
        </CardBlock>
        <CardBlock p={0}>
          <Button border={0} borderRadius={0} block size="lg">
            With Button
          </Button>
        </CardBlock>
        <CardBlock p={0}>
          <Button border={0} borderRadius={0} block size="lg">
            With Button
          </Button>
        </CardBlock>
      </Card>
    </Wrapper>
  ))
  .add('with Image Top', () => (
    <Wrapper>
      <Card>
        <CardImage>
          <img src="http://via.placeholder.com/400x300" alt="placeholder" />
        </CardImage>
        <CardBlock>Title</CardBlock>
        <CardBlock>Content</CardBlock>
        <CardBlock>Footer</CardBlock>
      </Card>
    </Wrapper>
  ))
  .add('with Image Bottom', () => (
    <Wrapper>
      <Card>
        <CardBlock>Title</CardBlock>
        <CardBlock>Content</CardBlock>
        <CardImage>
          <img src="http://via.placeholder.com/400x300" alt="placeholder" />
        </CardImage>
      </Card>
    </Wrapper>
  ));
