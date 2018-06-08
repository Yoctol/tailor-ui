import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Value } from 'react-powerplug';

import themeProvider from '../../../.storybook/theme-provider';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';
import { Heading, Box } from '../../';
import Modal from '../';
import Button from '../../Button';
import README from '../README.md';

storiesOf('Feedback|Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Value initial={false}>
        {({ value, setValue }) => (
          <Showcase>
            <Modal
              handleClose={() => setValue(false)}
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
            <Button onClick={() => setValue(true)}>Open Modal</Button>
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
          {({ value, setValue }) => (
            <Showcase>
              <Modal
                handleClose={() => setValue(false)}
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
              <Button onClick={() => setValue(true)}>Open Modal</Button>
            </Showcase>
          )}
        </Value>

        <Heading.h3>Modal with closeButton</Heading.h3>
        <Value initial={false}>
          {({ value, setValue }) => (
            <Showcase>
              <Modal
                handleClose={() => setValue(false)}
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
              <Button onClick={() => setValue(true)}>Open Modal</Button>
            </Showcase>
          )}
        </Value>

        <Heading.h3>Modal with custom style</Heading.h3>
        <Value initial={false}>
          {({ value, setValue }) => (
            <Showcase>
              <Modal
                handleClose={() => setValue(false)}
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
              <Button onClick={() => setValue(true)}>Open Modal</Button>
            </Showcase>
          )}
        </Value>
      </ShowcasePage>
    ))
  );
