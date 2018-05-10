import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withState } from 'recompose';

import Modal from '../';
import Button from '../../Button';

const showEnhancer = withState('show', 'setShow', false);

const WithShow = showEnhancer(({ show, setShow, children }) => (
  <div>
    <Button onClick={() => setShow(true)}>Open Modal</Button>
    {children({ handleClose: () => setShow(false), show })}
  </div>
));

storiesOf('Modal', module)
  .addDecorator(centered)
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
  ));
