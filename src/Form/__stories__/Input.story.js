import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import themeProvider from '../../../.storybook/theme-provider';
import FormField from '../FormField';
import Label from '../Label';
import Input from '../Input';
import Hint from '../Hint';

storiesOf('Data Entry|Input', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <FormField>
      <Label htmlFor="demo">With Default:</Label>
      <Input id="demo" placeholder="placeholder" />
    </FormField>
  ))
  .add('with status', () => (
    <>
      <FormField>
        <Label htmlFor="default">With none:</Label>
        <Input id="none" placeholder="none status" />
      </FormField>
      <FormField>
        <Label htmlFor="default">With default:</Label>
        <Input id="default" placeholder="default status" />
        <Hint>default status</Hint>
      </FormField>
      <FormField success>
        <Label htmlFor="success">With Success:</Label>
        <Input id="success" placeholder="has success" />
        <Hint>has success</Hint>
      </FormField>
      <FormField warning>
        <Label htmlFor="warning">With Warning:</Label>
        <Input id="warning" placeholder="has warning" />
        <Hint>has warning</Hint>
      </FormField>
      <FormField error>
        <Label htmlFor="error">With Error:</Label>
        <Input id="error" placeholder="has error" />
        <Hint>has error</Hint>
      </FormField>
    </>
  ))
  .add('with disabled', () => (
    <div>
      <Label htmlFor="demo">With Disabled:</Label>
      <Input id="demo" placeholder="placeholder" disabled />
    </div>
  ))
  .add('with size', () => (
    <div>
      <FormField>
        <Label size="sm" htmlFor="demo_sm">
          With sm:
        </Label>
        <Input id="demo_sm" size="sm" placeholder="placeholder" />
      </FormField>
      <FormField>
        <Label size="m" htmlFor="demo_m">
          With m:
        </Label>
        <Input id="demo_m" size="m" placeholder="placeholder" />
      </FormField>
      <FormField>
        <Label size="lg" htmlFor="demo_lg">
          With lg:
        </Label>
        <Input id="demo_lg" size="lg" placeholder="placeholder" />
      </FormField>
    </div>
  ));
