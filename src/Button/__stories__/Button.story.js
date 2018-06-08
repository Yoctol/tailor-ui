import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { withDocs } from 'storybook-readme';

import themeProvider from '../../../.storybook/theme-provider';
import { space } from '../../../.storybook/knobs';
import Showcase from '../../../.storybook/showcase';
import { Flex, Space, Heading } from '../../';
import Button from '../';
import README from '../README.md';

const sizes = { sm: 'SM', m: 'M (Default)', lg: 'LG' };

const withCustomizePreviewDocs = withDocs({
  PreviewComponent: Space,
});

storiesOf('General|Button', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withCustomizePreviewDocs(README, () => (
      <Showcase>
        <Button
          block={boolean('block', false, 'props')}
          circle={boolean('circle', false, 'props')}
          light={boolean('light', false, 'props')}
          active={boolean('active', false, 'props')}
          ghost={boolean('ghost', false, 'props')}
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
    withCustomizePreviewDocs('<!-- STORY -->', () => (
      <Flex flexDirection="column" p={5}>
        <Heading.h1 mb={5}>Button Showcase</Heading.h1>

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
          <Button disalbed>Button</Button>
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
      </Flex>
    ))
  );
