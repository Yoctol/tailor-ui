import React, { useState } from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import { Button } from '../../Button';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Modal visible onCancel={() => {}} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render correctly with lg size', () => {
    const { baseElement } = render(
      <Modal size="lg" visible onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with props closable', () => {
    const { baseElement } = render(
      <Modal visible closable onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with different status', () => {
    const { baseElement } = render(
      <>
        <Modal status="info" visible closable onCancel={() => {}} />
        <Modal status="success" visible closable onCancel={() => {}} />
        <Modal status="warning" visible closable onCancel={() => {}} />
        <Modal status="error" visible closable onCancel={() => {}} />
      </>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should display modal when click show modal button', async () => {
    const ModalWithState = () => {
      const [visible, setVisible] = useState(false);

      return (
        <>
          <Modal
            title="This is a Modal"
            visible={visible}
            closable
            onConfirm={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            data-testid="modal"
          >
            This is the content of Modal
          </Modal>
          <Button data-testid="open-button" onClick={() => setVisible(true)}>
            Button
          </Button>
        </>
      );
    };

    const { getByTestId, getByText } = render(<ModalWithState />);

    const openButton = await getByTestId('open-button');

    fireEvent.click(openButton);

    const modal = getByText('This is the content of Modal');

    expect(modal).toBeInTheDocument();
  });

  it('should not display modal when click close button', async () => {
    const ModalWithState = () => {
      const [visible, setVisible] = useState(true);

      return (
        <>
          <Modal
            title="This is a Modal"
            visible={visible}
            closable
            onConfirm={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            data-testid="modal"
          >
            This is the content of Modal
          </Modal>
          <Button data-testid="open-button">Button</Button>
        </>
      );
    };

    const { getByText } = render(<ModalWithState />);

    const closeButton = await getByText('Cancel');

    fireEvent.click(closeButton);

    const popconfirm = getByText('This is the content of Modal');

    expect(popconfirm).not.toBeVisible();
  });

  // TODO: Add useModal tests
});
