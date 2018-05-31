import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import { Flex, Box } from '../../';
import themeProvider from '../../../.storybook/theme-provider';
import Label from '../Label';
import Input from '../Input';
import Hint from '../Hint';

storiesOf('Data Entry|Input', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <div>
      <Label htmlFor="demo">With Default:</Label>
      <Input id="demo" placeholder="placeholder" />
    </div>
  ))
  .add('with status', () => (
    <div>
      <Label htmlFor="default">With default:</Label>
      <Input id="default" placeholder="default status" />
      <Hint>default status</Hint>
      <Label htmlFor="success">With Success:</Label>
      <Input id="success" success placeholder="has success" />
      <Hint success>has success</Hint>
      <Label htmlFor="warning">With Warning:</Label>
      <Input id="warning" warning placeholder="has warning" />
      <Hint warning>has warning</Hint>
      <Label htmlFor="error">With Error:</Label>
      <Input id="error" error placeholder="has error" />
      <Hint error>has error</Hint>
    </div>
  ))
  .add('with disabled', () => (
    <div>
      <Label htmlFor="demo">With Disabled:</Label>
      <Input id="demo" placeholder="placeholder" disabled />
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
