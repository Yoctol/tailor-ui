import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Flex } from 'grid-styled';

import Label from '../../Form/Label';
import Radio from '../';

storiesOf('Data Entry|Radio', module)
  .addDecorator(centered)
  .add('default', () => (
    <Flex flexDirection="column">
      <Flex>
        <Radio name="radio" size="sm" defaultChecked />
        <Label htmlFor="small">小</Label>
      </Flex>
      <Flex>
        <Radio name="radio" />
        <Label htmlFor="medium">中</Label>
      </Flex>
      <Flex>
        <Radio name="radio" size="lg" disabled />
        <Label htmlFor="large">大（disabled）</Label>
      </Flex>
    </Flex>
  ));
