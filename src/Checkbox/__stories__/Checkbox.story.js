import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import themeProvider from '../../../.storybook/theme-provider';
import { color } from '../../../.storybook/knobs';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import { Heading, Label } from '../..';
import README from '../README.md';

import Checkbox from '..';

storiesOf('Data Entry|Checkbox', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Checkbox
          id="checkbox"
          disabled={boolean('disabled', false, 'props')}
          {...color()}
          onChange={action('onChange')}
        />
        <Label htmlFor="checkbox">Checkbox</Label>
      </Showcase>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Checkbox">
        <Heading.h3>Checkbox with disabled</Heading.h3>
        <Showcase>
          <Checkbox id="checked-disabled" checked disabled />
          <Label htmlFor="checked-disabled">Checked Disabled</Label>
          <br />
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled">Disabled</Label>
        </Showcase>

        <Heading.h3>Checkbxo with customized color</Heading.h3>
        <Showcase>
          <Checkbox
            id="custom"
            bg="#63bf2d"
            borderColor="#423b63"
            onChange={action('onChange')}
          />
          <Label htmlFor="custom">Customized Color Checkbox</Label>
        </Showcase>
      </ShowcasePage>
    ))
  );
