import React, { useState } from 'react';
import createMockRaf from '@react-spring/mock-raf';

import { fireEvent, render } from 'test/test-utils';

import { Button } from '../../Button';
import { Modal } from '../Modal';

const mockRaf = createMockRaf();

window.requestAnimationFrame = mockRaf.raf;
window.cancelAnimationFrame = mockRaf.cancel;

describe('Modal', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Modal visible onCancel={() => {}} />);

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render correctly with lg size', () => {
    const { baseElement } = render(
      <Modal size="lg" visible onCancel={() => {}} />
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with props closable', () => {
    const { baseElement } = render(
      <Modal visible closable onCancel={() => {}} />
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with info status', () => {
    const { baseElement } = render(
      <Modal status="info" visible closable onCancel={() => {}} />
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with success status', () => {
    const { baseElement } = render(
      <Modal status="success" visible closable onCancel={() => {}} />
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with warning status', () => {
    const { baseElement } = render(
      <Modal status="warning" visible closable onCancel={() => {}} />
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with error status', () => {
    const { baseElement } = render(
      <Modal status="error" visible closable onCancel={() => {}} />
    );

    mockRaf.flush();

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

    mockRaf.flush();

    expect(modal).toBeVisible();
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

    const { getByText, queryByText } = render(<ModalWithState />);

    const closeButton = await getByText('Cancel');

    fireEvent.click(closeButton);

    mockRaf.flush();

    const modal = queryByText('This is the content of Modal');

    expect(modal).toBeNull();
  });
});
