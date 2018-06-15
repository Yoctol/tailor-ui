import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';

import themeProvider from '../../../.storybook/theme-provider';
import { space, color } from '../../../.storybook/knobs';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import README from '../README.md';
import Heading from '../';

storiesOf('General|Heading', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Heading.h1
          gray={boolean('gray', false, 'props')}
          grayLight={boolean('grayLight', false, 'props')}
          grayHint={boolean('grayHint', false, 'props')}
          light={boolean('light', false, 'props')}
          {...space()}
          {...color()}
        >
          {text('children', 'Heading', 'props')}
        </Heading.h1>
      </Showcase>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Heading">
        <Heading.h3>with default</Heading.h3>
        <Showcase>
          <Heading.h1>
            H1 Heading <small>28px</small>
          </Heading.h1>
          <Heading.h2>
            H2 Heading <small>25px</small>
          </Heading.h2>
          <Heading.h3>
            H3 Heading <small>18px</small>
          </Heading.h3>
          <Heading.h4>
            H4 Heading <small>16px</small>
          </Heading.h4>
          <Heading.h5>
            H5 Heading <small>14px</small>
          </Heading.h5>
          <Heading.h6>
            H6 Heading <small>12px</small>
          </Heading.h6>
        </Showcase>

        <Heading.h3>with gray</Heading.h3>
        <Showcase>
          <Heading.h1 gray>
            H1 Heading <small>28px</small>
          </Heading.h1>
          <Heading.h2 gray>
            H2 Heading <small>25px</small>
          </Heading.h2>
          <Heading.h3 gray>
            H3 Heading <small>18px</small>
          </Heading.h3>
          <Heading.h4 gray>
            H4 Heading <small>16px</small>
          </Heading.h4>
          <Heading.h5 gray>
            H5 Heading <small>14px</small>
          </Heading.h5>
          <Heading.h6 gray>
            H6 Heading <small>12px</small>
          </Heading.h6>
        </Showcase>

        <Heading.h3>with grayLight</Heading.h3>
        <Showcase>
          <Heading.h1 grayLight>
            H1 Heading <small>28px</small>
          </Heading.h1>
          <Heading.h2 grayLight>
            H2 Heading <small>25px</small>
          </Heading.h2>
          <Heading.h3 grayLight>
            H3 Heading <small>18px</small>
          </Heading.h3>
          <Heading.h4 grayLight>
            H4 Heading <small>16px</small>
          </Heading.h4>
          <Heading.h5 grayLight>
            H5 Heading <small>14px</small>
          </Heading.h5>
          <Heading.h6 grayLight>
            H6 Heading <small>12px</small>
          </Heading.h6>
        </Showcase>

        <Heading.h3>with grayHint</Heading.h3>
        <Showcase>
          <Heading.h1 grayHint>
            H1 Heading <small>28px</small>
          </Heading.h1>
          <Heading.h2 grayHint>
            H2 Heading <small>25px</small>
          </Heading.h2>
          <Heading.h3 grayHint>
            H3 Heading <small>18px</small>
          </Heading.h3>
          <Heading.h4 grayHint>
            H4 Heading <small>16px</small>
          </Heading.h4>
          <Heading.h5 grayHint>
            H5 Heading <small>14px</small>
          </Heading.h5>
          <Heading.h6 grayHint>
            H6 Heading <small>12px</small>
          </Heading.h6>
        </Showcase>

        <Heading.h3>with white</Heading.h3>
        <Showcase bg="dark">
          <Heading.h1 white>
            H1 Heading <small>28px</small>
          </Heading.h1>
          <Heading.h2 white>
            H2 Heading <small>25px</small>
          </Heading.h2>
          <Heading.h3 white>
            H3 Heading <small>18px</small>
          </Heading.h3>
          <Heading.h4 white>
            H4 Heading <small>16px</small>
          </Heading.h4>
          <Heading.h5 white>
            H5 Heading <small>14px</small>
          </Heading.h5>
          <Heading.h6 white>
            H6 Heading <small>12px</small>
          </Heading.h6>
        </Showcase>
      </ShowcasePage>
    ))
  );
