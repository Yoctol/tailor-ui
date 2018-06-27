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
import { Heading, Label } from '../../';
import README from '../README.md';
import Radio from '../';

storiesOf('Data Entry|Radio', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Radio
          name="radio"
          id="a"
          disabled={boolean('disabled', false, 'props')}
          defaultChecked
          {...color()}
          onChange={action('onChange')}
        />
        <Label htmlFor="a">Radio A</Label>
        <br />
        <Radio
          name="radio"
          id="b"
          disabled={boolean('disabled', false, 'props')}
          defaultChecked
          {...color()}
          onChange={action('onChange')}
        />
        <Label htmlFor="b">Radio B</Label>
      </Showcase>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Radio">
        <Heading.h3>Radio with disabled</Heading.h3>
        <Showcase>
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
        </Showcase>

        <Heading.h3>Radio with customized color</Heading.h3>
        <Showcase>
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
        </Showcase>
      </ShowcasePage>
    ))
  );
