import React from 'react';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

import themeProvider from '../../../.storybook/theme-provider';
import Card from '../';

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <div style={{ width: 400 }}>{children}</div>;

storiesOf('Data Display|Card', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('with text', () => (
    <Wrapper>
      <Card>
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Block>Footer</Card.Block>
      </Card>
    </Wrapper>
  ))
  .add('with Button', () => (
    <Wrapper>
      <Card>
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Button block>With Button</Card.Button>
        <Card.Button block>With Button</Card.Button>
        <Card.Button block>With Button</Card.Button>
      </Card>
    </Wrapper>
  ))
  .add('with Image Top', () => (
    <Wrapper>
      <Card>
        <Card.Image>
          <img src="http://via.placeholder.com/400x300" alt="placeholder" />
        </Card.Image>
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Block>Footer</Card.Block>
      </Card>
    </Wrapper>
  ))
  .add('with Image Bottom', () => (
    <Wrapper>
      <Card>
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Image>
          <img src="http://via.placeholder.com/400x300" alt="placeholder" />
        </Card.Image>
      </Card>
    </Wrapper>
  ));
