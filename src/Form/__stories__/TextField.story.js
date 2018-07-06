import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Input } from 'react-powerplug';

import themeProvider from '../../../.storybook/theme-provider';
import TextField from '../TextField';

storiesOf('Data Entry|TextField', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <>
      <Input>{({ bind }) => <TextField label="Text Field" {...bind} />}</Input>
      <Input>
        {({ bind }) => (
          <TextField label="Text Field" maxLength={12} {...bind} />
        )}
      </Input>
      <Input>
        {({ bind }) => (
          <TextField
            textarea
            minRows={2}
            maxRows={6}
            label="Text Field(textarea)"
            {...bind}
          />
        )}
      </Input>
      <Input>
        {({ bind }) => (
          <TextField
            textarea
            minRows={2}
            maxRows={6}
            label="Text Field(textarea)"
            maxLength={100}
            {...bind}
          />
        )}
      </Input>
    </>
  ))
  .add('maxlength', () => (
    <Input>
      {({ value, bind }) => {
        const hasError = value === 'error';
        return (
          <TextField
            label="Text Field"
            maxLength={12}
            error={hasError}
            message="Just show error"
            {...bind}
          />
        );
      }}
    </Input>
  ))
  .add('status', () => (
    <>
      <TextField value="default" label="Text Field" />
      <TextField
        label="Text Field"
        value="Success"
        success
        message="This is a success message"
      />
      <TextField
        label="Text Field"
        value="Warning"
        warning
        message="This is a warning message"
      />
      <TextField
        label="Text Field"
        value="Error"
        error
        message="This is a error message"
      />
    </>
  ));
