import React from 'react';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';
import { Value } from 'react-powerplug';

import themeProvider from '../../../.storybook/theme-provider';
import RadioField from '../RadioField';
import Box from '../../Grid/Box';

storiesOf('Data Entry|RadioField', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <Value initial="">
      {({ set, value }) => (
        <RadioField.Group
          options={[
            { label: 'Radio A', value: 'radio_A' },
            { label: 'Radio B', value: 'radio_B' },
          ]}
          value={value}
          onChange={val => set(val)}
        />
      )}
    </Value>
  ))
  .add('group', () => (
    <Value initial="">
      {({ set, value }) => (
        <RadioField.Group
          label="Radio Group"
          options={[
            { label: 'Radio A', value: 'radio_A' },
            { label: 'Radio B', value: 'radio_B' },
            { label: 'Radio C', value: 'radio_C', disabled: true },
            { label: 'Radio D', value: 'radio_D' },
          ]}
          value={value}
          onChange={val => set(val)}
        />
      )}
    </Value>
  ))
  .add('error', () => (
    <Box width="200px">
      <Value initial="">
        {({ set, value }) => (
          <RadioField.Group
            label="Radio Group"
            error
            message="Something went wrong!"
            options={[
              { label: 'Radio A', value: 'radio_A' },
              { label: 'Radio B', value: 'radio_B' },
              { label: 'Radio C', value: 'radio_C' },
              { label: 'Radio D', value: 'radio_D' },
            ]}
            value={value}
            onChange={val => set(val)}
          />
        )}
      </Value>
    </Box>
  ));
