import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Flex, Box } from 'grid-styled';

import Label from '../Label';
import Input from '../Input';

storiesOf('Input', module)
  .addDecorator(centered)
  .add('default', () => (
    <div>
      <Label htmlFor="demo">With Default:</Label>
      <Input id="demo" placeholder="placeholder" />
    </div>
  ))
  .add('with inline', () => (
    <Flex width="600px">
      <Box width={1 / 4}>
        <Label htmlFor="demo">With Inline:</Label>
      </Box>
      <Box width={3 / 4}>
        <Input id="demo" inline placeholder="placeholder" />
      </Box>
    </Flex>
  ))
  .add('with size', () => (
    <div>
      <Label size="sm" htmlFor="demo_sm">
        With sm:
      </Label>
      <Input id="demo_sm" size="sm" placeholder="placeholder" />
      <Label size="m" htmlFor="demo_m">
        With m:
      </Label>
      <Input id="demo_m" size="m" placeholder="placeholder" />
      <Label size="lg" htmlFor="demo_lg">
        With lg:
      </Label>
      <Input id="demo_lg" size="lg" placeholder="placeholder" />
    </div>
  ));
