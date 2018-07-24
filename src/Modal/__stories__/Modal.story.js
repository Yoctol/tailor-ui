import React from 'react';
import { Value } from 'react-powerplug';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Button from '../../Button';
import README from '../README.md';
import themeProvider from '../../../.storybook/theme-provider';
import { Box, Heading } from '../..';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';

import Modal from '..';

storiesOf('Feedback|Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Value initial={false}>
        {({ value, set }) => (
          <Showcase>
            <Modal
              handleClose={() => set(false)}
              show={boolean('show', value, 'props')}
              closeButton={boolean('closeButton', value, 'props')}
            >
              <h1>Modal</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati ducimus quas beatae commodi corrupti quidem aut a rem
                sapiente, minus ipsum incidunt fugiat quibusdam cupiditate
                suscipit iste pariatur consectetur autem?
              </p>
            </Modal>
            <Button onClick={() => set(true)}>Open Modal</Button>
          </Showcase>
        )}
      </Value>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Modal Showcase">
        <Heading.h3>Default Modal</Heading.h3>
        <Value initial={false}>
          {({ value, set }) => (
            <Showcase>
              <Modal
                handleClose={() => set(false)}
                show={boolean('show', value, 'props')}
              >
                <h1>Modal</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati ducimus quas beatae commodi corrupti quidem aut a
                  rem sapiente, minus ipsum incidunt fugiat quibusdam cupiditate
                  suscipit iste pariatur consectetur autem?
                </p>
              </Modal>
              <Button onClick={() => set(true)}>Open Modal</Button>
            </Showcase>
          )}
        </Value>

        <Heading.h3>Modal with closeButton</Heading.h3>
        <Value initial={false}>
          {({ value, set }) => (
            <Showcase>
              <Modal
                handleClose={() => set(false)}
                show={boolean('show', value, 'props')}
                closeButton={boolean('closeButton', value, 'props')}
              >
                <h1>Modal</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati ducimus quas beatae commodi corrupti quidem aut a
                  rem sapiente, minus ipsum incidunt fugiat quibusdam cupiditate
                  suscipit iste pariatur consectetur autem?
                </p>
              </Modal>
              <Button onClick={() => set(true)}>Open Modal</Button>
            </Showcase>
          )}
        </Value>

        <Heading.h3>Modal with custom style</Heading.h3>
        <Value initial={false}>
          {({ value, set }) => (
            <Showcase>
              <Modal
                handleClose={() => set(false)}
                show={boolean('show', value, 'props')}
                closeButton={boolean('closeButton', value, 'props')}
              >
                <Box style={{ width: 800, height: 300 }}>
                  <h1>Modal</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati ducimus quas beatae commodi corrupti quidem aut a
                    rem sapiente, minus ipsum incidunt fugiat quibusdam
                    cupiditate suscipit iste pariatur consectetur autem?
                  </p>
                </Box>
              </Modal>
              <Button onClick={() => set(true)}>Open Modal</Button>
            </Showcase>
          )}
        </Value>
      </ShowcasePage>
    ))
  );
