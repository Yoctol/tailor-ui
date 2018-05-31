import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import themeProvider from '../../../.storybook/theme-provider';
import Checkbox from '../';

storiesOf('Data Entry|Checkbox', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <div>
      <Checkbox onChange={action('onChange')} />
      <br />
      <Checkbox circle onChange={action('onChange')} />
    </div>
  ))
  .add('with disabled', () => (
    <div>
      <Checkbox checked disabled />
      <br />
      <Checkbox disabled />
    </div>
  ))
  .add('with cutomized style', () => (
    <Checkbox
      width={30}
      height={30}
      bg="#63bf2d"
      borderColor="#423b63"
      onChange={action('onChange')}
    />
  ));
