import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Value } from 'react-powerplug';

import themeProvider from '../../../.storybook/theme-provider';
import Modal from '../';
import Button from '../../Button';

// eslint-disable-next-line react/prop-types
const WithShow = ({ children }) => (
  <Value initial={false}>
    {({ value, setValue }) => (
      <>
        <Button onClick={() => setValue(true)}>Open Modal</Button>
        {children({ handleClose: () => setValue(false), show: value })}
      </>
    )}
  </Value>
);

storiesOf('Feedback|Modal', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <WithShow>
      {({ handleClose, show }) => (
        <Modal handleClose={handleClose} show={show}>
          <h1>Modal</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            ducimus quas beatae commodi corrupti quidem aut a rem sapiente,
            minus ipsum incidunt fugiat quibusdam cupiditate suscipit iste
            pariatur consectetur autem?
          </p>
        </Modal>
      )}
    </WithShow>
  ))
  .add('with custom width', () => (
    <WithShow>
      {({ handleClose, show }) => (
        <Modal handleClose={handleClose} show={show}>
          <div style={{ width: 600 }}>
            <h1>Modal</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati ducimus quas beatae commodi corrupti quidem aut a rem
              sapiente, minus ipsum incidunt fugiat quibusdam cupiditate
              suscipit iste pariatur consectetur autem?
            </p>
          </div>
        </Modal>
      )}
    </WithShow>
  ))
  .add('with close button', () => (
    <WithShow>
      {({ handleClose, show }) => (
        <Modal handleClose={handleClose} show={show} closeButton>
          <h1>Modal</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            ducimus quas beatae commodi corrupti quidem aut a rem sapiente,
            minus ipsum incidunt fugiat quibusdam cupiditate suscipit iste
            pariatur consectetur autem?
          </p>
        </Modal>
      )}
    </WithShow>
  ));
