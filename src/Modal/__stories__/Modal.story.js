import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withState } from 'recompose';

import Modal from '../';
import Button from '../../Button';

const withShow = withState('show', 'setShow', false);

const ToggleModal = withShow(({ show, setShow, children, ...props }) => (
  <div>
    <Button onClick={() => setShow(true)}>Open Modal</Button>
    <Modal handleClose={() => setShow(false)} show={show} {...props}>
      {children}
    </Modal>
  </div>
));

storiesOf('Modal', module)
  .addDecorator(centered)
  .add('with text', () => (
    <ToggleModal>
      <h1>Toggle Modal</h1>
    </ToggleModal>
  ))
  .add('with width', () => (
    <ToggleModal>
      <div style={{ width: 600 }}>
        <h1>Toggle Modal</h1>
      </div>
    </ToggleModal>
  ));
