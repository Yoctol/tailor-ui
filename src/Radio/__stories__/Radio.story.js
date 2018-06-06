import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import themeProvider from '../../../.storybook/theme-provider';
import Label from '../../Form/Label';
import Radio from '../';

storiesOf('Data Entry|Radio', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <>
      <Radio name="radio" id="a" defaultChecked onChange={action('onChange')} />
      <Label htmlFor="a">Radio A</Label>
      <br />
      <Radio name="radio" id="b" defaultChecked onChange={action('onChange')} />
      <Label htmlFor="b">Radio B</Label>
    </>
  ))
  .add('disabled', () => (
    <>
      <Radio
        name="radio"
        id="a"
        checked
        disabled
        onChange={action('onChange')}
      />
      <Label htmlFor="a">Checked Disabled</Label>
      <br />
      <Radio name="radio" id="b" disabled onChange={action('onChange')} />
      <Label htmlFor="b">Disabled</Label>
    </>
  ))
  .add('with cutomized color', () => (
    <>
      <Radio
        name="customized"
        id="custom-a"
        bg="#63bf2d"
        borderColor="#423b63"
        onChange={action('onChange')}
      />
      <Label htmlFor="custom-a">Customized Color Radio A</Label>
      <br />
      <Radio
        name="customized"
        id="custom-b"
        bg="#63bf2d"
        borderColor="#423b63"
        onChange={action('onChange')}
      />
      <Label htmlFor="custom-b">Customized Color Radio B</Label>
    </>
  ));
