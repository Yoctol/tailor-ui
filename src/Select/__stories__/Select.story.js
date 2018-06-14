import React from 'react';
import { storiesOf } from '@storybook/react';
import { range } from 'ramda';

import themeProvider from '../../../.storybook/theme-provider';
import { Showcase } from '../../../.storybook/showcase';
import { withComponentReadme } from '../../../.storybook/withDocs';
import Select from '../';
import README from '../README.md';

storiesOf('Data Entry|Select', module)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Select
          isDisabled
          value={{ label: 'Item 1', value: 1 }}
          onChange={option => console.log(option)}
          options={range(1, 6).map(value => ({
            label: `Item ${value}`,
            value,
          }))}
        />
      </Showcase>
    ))
  );
