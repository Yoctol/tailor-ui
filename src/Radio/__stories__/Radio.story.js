import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import { Flex } from '../../';
import themeProvider from '../../../.storybook/theme-provider';
import Label from '../../Form/Label';
import Radio from '../';

storiesOf('Data Entry|Radio', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <Flex flexDirection="column">
      <Flex>
        <Radio name="radio" size="sm" defaultChecked />
        <Label htmlFor="small">Small</Label>
      </Flex>
      <Flex>
        <Radio name="radio" />
        <Label htmlFor="medium">Medium</Label>
      </Flex>
      <Flex>
        <Radio name="radio" size="lg" disabled />
        <Label htmlFor="large">Large with disabled</Label>
      </Flex>
    </Flex>
  ));
