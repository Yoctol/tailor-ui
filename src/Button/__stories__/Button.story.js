import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';

import themeProvider from '../../../.storybook/theme-provider';
import { space } from '../../../.storybook/knobs';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import { Heading } from '../..';

import Button from '..';

import README from '../README.md';

const sizes = { sm: 'SM', m: 'M (Default)', lg: 'LG' };

storiesOf('General|Button', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Button
          block={boolean('block', false, 'props')}
          circle={boolean('circle', false, 'props')}
          danger={boolean('danger', false, 'props')}
          light={boolean('light', false, 'props')}
          active={boolean('active', false, 'props')}
          ghost={boolean('ghost', false, 'props')}
          loading={boolean('loading', false, 'props')}
          size={select('size', sizes, 'm', 'props')}
          {...space()}
          onClick={action('clicked')}
        >
          {text('children', 'Button', 'props')}
        </Button>
      </Showcase>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Button Showcase">
        <Heading.h3>Button with circle</Heading.h3>
        <Showcase>
          <Button circle onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with light</Heading.h3>
        <Showcase>
          <Button light onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with danger</Heading.h3>
        <Showcase>
          <Button danger onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with light & circle</Heading.h3>
        <Showcase>
          <Button light circle onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with light & circle & active</Heading.h3>
        <Showcase>
          <Button light circle active onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with disabled</Heading.h3>
        <Showcase>
          <Button disabled>Button</Button>
        </Showcase>

        <Heading.h3>Button with loading</Heading.h3>
        <Showcase>
          <Button loading>Button</Button>
          <br />
          <Button light loading onClick={action('clicked')}>
            Button
          </Button>
          <br />
          <Button light circle loading onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with size</Heading.h3>
        <Showcase>
          <Button size="sm" onClick={action('clicked')}>
            Button sm
          </Button>

          <Button mt={2} onClick={action('clicked')}>
            Button m
          </Button>

          <Button size="lg" mt={2} onClick={action('clicked')}>
            Button lg
          </Button>
        </Showcase>

        <Heading.h3>Button with block</Heading.h3>
        <Showcase>
          <Button block onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>

        <Heading.h3>Button with ghost</Heading.h3>
        <Showcase bg="primary">
          <Button ghost onClick={action('clicked')}>
            Button
          </Button>
        </Showcase>
      </ShowcasePage>
    ))
  );
