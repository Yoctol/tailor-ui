import React from 'react';
import { Value } from 'react-powerplug';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { range } from 'ramda';
import { storiesOf } from '@storybook/react';

import themeProvider from '../../../.storybook/theme-provider';
import { Showcase } from '../../../.storybook/showcase';
import { withComponentReadme } from '../../../.storybook/withDocs';

import Select from '..';

import README from '../README.md';

storiesOf('Data Entry|Select', module)
  .addDecorator(themeProvider)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Value initial={{ label: 'Item 1', value: 1 }}>
        {({ value, set }) => (
          <Showcase>
            <Select
              isClearable={boolean('isClearable', false, 'props')}
              isDisabled={boolean('isDisabled', false, 'props')}
              value={value}
              onChange={option => set(option)}
              options={range(1, 6).map(val => ({
                label: `Item ${val}`,
                val,
              }))}
            />
          </Showcase>
        )}
      </Value>
    ))
  );
