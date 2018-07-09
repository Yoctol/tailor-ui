import React from 'react';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';
import { Toggle, Value } from 'react-powerplug';

import themeProvider from '../../../.storybook/theme-provider';
import CheckboxField from '../CheckboxField';
import Box from '../../Grid/Box';

storiesOf('Data Entry|CheckboxField', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <Toggle>
      {({ on, toggle }) => (
        <CheckboxField checked={on} onChange={toggle}>
          Checkbox
        </CheckboxField>
      )}
    </Toggle>
  ))
  .add('group', () => (
    <Value initial={[]}>
      {({ set, value }) => (
        <CheckboxField.Group
          label="Checkbox Group"
          options={[
            { label: 'checkbox 1', value: 'check_1' },
            { label: 'checkbox 2', value: 'check_2' },
            { label: 'checkbox 3', value: 'check_3', disabled: true },
            { label: 'checkbox 4', value: 'check_4' },
          ]}
          values={value}
          onChange={val => set(val)}
        />
      )}
    </Value>
  ))
  .add('error', () => (
    <Box width="200px">
      <Toggle>
        {({ on, toggle }) => (
          <CheckboxField
            checked={on}
            onChange={toggle}
            error
            message="Something went wrong!"
          >
            Checkbox
          </CheckboxField>
        )}
      </Toggle>

      <Value initial={[]}>
        {({ set, value }) => (
          <CheckboxField.Group
            label="Checkbox Group"
            error
            message="Something went wrong!"
            options={[
              { label: 'checkbox 1', value: 'check_1' },
              { label: 'checkbox 2', value: 'check_2' },
              { label: 'checkbox 3', value: 'check_3' },
              { label: 'checkbox 4', value: 'check_4' },
            ]}
            values={value}
            onChange={val => set(val)}
          />
        )}
      </Value>
    </Box>
  ));
