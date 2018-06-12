import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Value } from 'react-powerplug';

import ThemeProvider from '../ThemeProvider';
import Button from '../../Button';
import Select from '../../Select';

const options = [
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
];

storiesOf('Other|ThemeProvider', module)
  .addDecorator(centered)
  .add('default', () => (
    <Value initial="yellow">
      {({ value, set }) => (
        <ThemeProvider theme={value}>
          <>
            <Button mb={3} light circle active>
              {options.find(option => option.value === value).label} Secondary
            </Button>
            <Select
              options={options}
              value={options.find(option => option.value === value)}
              onChange={option => set(option.value)}
            />
          </>
        </ThemeProvider>
      )}
    </Value>
  ));
