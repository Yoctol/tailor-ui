import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Toggle } from 'react-powerplug';

import ThemeProvider from '../ThemeProvider';
import Button from '../../Button';

storiesOf('Other|ThemeProvider', module)
  .addDecorator(centered)
  .add('default', () => (
    <Toggle>
      {({ toggle, on }) => (
        <ThemeProvider theme={on ? 'green' : 'blue'}>
          <>
            <Button mr={3} onClick={toggle}>
              Change Secondary
            </Button>
            <Button light circle active>
              {on ? 'Green' : 'Blue'} Secondary
            </Button>
          </>
        </ThemeProvider>
      )}
    </Toggle>
  ));
