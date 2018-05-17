import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { range } from 'lodash';

import Select from '../';

storiesOf('Select', module)
  .addDecorator(centered)
  .add('default', () => (
    <div style={{ width: 200 }}>
      <Select
        options={range(1, 11).map(value => ({ label: `Item ${value}`, value }))}
      />
    </div>
  ));