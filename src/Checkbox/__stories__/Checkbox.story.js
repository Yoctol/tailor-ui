import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import themeProvider from '../../../.storybook/theme-provider';
import Checkbox from '../';
import Label from '../../Form/Label';

storiesOf('Data Entry|Checkbox', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <>
      <Checkbox id="checkbox" onChange={action('onChange')} />
      <Label htmlFor="checkbox">Checkbox</Label>
    </>
  ))
  .add('with disabled', () => (
    <>
      <Checkbox id="checked-disabled" checked disabled />
      <Label htmlFor="checked-disabled">Checked Disabled</Label>
      <br />
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
    </>
  ))
  .add('with cutomized color', () => (
    <>
      <Checkbox
        id="custom"
        bg="#63bf2d"
        borderColor="#423b63"
        onChange={action('onChange')}
      />
      <Label htmlFor="custom">Customized Color Checkbox</Label>
    </>
  ));
