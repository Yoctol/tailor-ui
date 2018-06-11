import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';

import themeProvider from '../../../.storybook/theme-provider';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import {
  space,
  color,
  borders,
  borderColor,
  borderRadius,
  minWidth,
  fontSize,
  textAlign,
} from '../../../.storybook/knobs';
import README from '../README.md';
import Tooltip from '../';
import { Button, Heading } from '../../';

const placements = {
  top: 'Top (Default)',
  right: 'Right',
  bottom: 'Bottm',
  left: 'Left',
};

storiesOf('Data Display|Tooltip', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Tooltip
          placement={select('placement', placements, 'top', 'props')}
          content={text('content', 'Content', 'props')}
          trigger={select(
            'trigger',
            { hover: 'Hover (Default)', click: 'Click' },
            'hover',
            'props'
          )}
          light={boolean('light', false, 'props')}
          {...space()}
          {...color()}
          {...borders()}
          {...borderColor()}
          {...borderRadius()}
          {...minWidth()}
          {...fontSize()}
          {...textAlign()}
        >
          <Button>Button</Button>
        </Tooltip>
      </Showcase>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Tooltip Showcase">
        <Heading>Tooltip with top & hover</Heading>
        <Showcase>
          <Tooltip placement="top" content={<span>Tooltip Content</span>}>
            <Button>Button</Button>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with right & hover</Heading>
        <Showcase>
          <Tooltip placement="right" content={<span>Tooltip Content</span>}>
            <span>Hover right</span>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with left & click</Heading>
        <Showcase>
          <Tooltip
            trigger="click"
            placement="left"
            content={<span>Tooltip Content</span>}
          >
            <Button>Click left</Button>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with bottom & click</Heading>
        <Showcase>
          <Tooltip
            trigger="click"
            placement="bottom"
            content={<span>Tooltip Content</span>}
          >
            <Button>Click bottom</Button>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with top & hover & light</Heading>
        <Showcase>
          <Tooltip light placement="top" content={<span>Tooltip Content</span>}>
            <span>Hover top</span>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with right & hover & light</Heading>
        <Showcase>
          <Tooltip
            light
            placement="right"
            content={<span>Tooltip Content</span>}
          >
            <span>Hover right</span>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with left & click & light</Heading>
        <Showcase>
          <Tooltip
            light
            trigger="click"
            placement="left"
            content={<span>Tooltip Content</span>}
          >
            <Button>Click left</Button>
          </Tooltip>
        </Showcase>

        <Heading>Tooltip with bottom & click & light</Heading>
        <Showcase>
          <Tooltip
            light
            trigger="click"
            placement="bottom"
            content={<span>Tooltip Content</span>}
          >
            <Button>Click bottom</Button>
          </Tooltip>
        </Showcase>
      </ShowcasePage>
    ))
  );
