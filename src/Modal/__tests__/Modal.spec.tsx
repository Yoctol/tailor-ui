import React from 'react';

import { render, screen, waitForElementToBeRemoved } from 'test/test-utils';

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

  it('should render with info status', () => {
    const { baseElement } = render(
      <Modal status="info" visible closable onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with success status', () => {
    const { baseElement } = render(
      <Modal status="success" visible closable onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with warning status', () => {
    const { baseElement } = render(
      <Modal status="warning" visible closable onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with error status', () => {
    const { baseElement } = render(
      <Modal status="error" visible closable onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should display modal when click show modal button', async () => {
    const { rerender } = render(
      <Modal
        title="This is a Modal"
        visible={false}
        closable
        onCancel={() => {}}
      >
        This is the content of Modal
      </Modal>
    );

    const modal = screen.queryByText('This is a Modal');
    expect(modal).not.toBeInTheDocument();

    rerender(
      <Modal title="This is a Modal" visible closable onCancel={() => {}}>
        This is the content of Modal
      </Modal>
    );

    const visibleModal = screen.queryByText('This is a Modal');
    expect(visibleModal).toBeInTheDocument();
  });

  it('should not display modal when click close button', async () => {
    const { rerender } = render(
      <Modal title="This is a Modal" visible closable onCancel={() => {}}>
        This is the content of Modal
      </Modal>
    );

    const modal = screen.queryByText('This is a Modal');
    expect(modal).toBeInTheDocument();

    rerender(
      <Modal
        title="This is a Modal"
        visible={false}
        closable
        onCancel={() => {}}
      >
        This is the content of Modal
      </Modal>
    );

    await waitForElementToBeRemoved(screen.queryByText('This is a Modal'));

    const visibleModal = screen.queryByText('This is a Modal');
    expect(visibleModal).not.toBeInTheDocument();
  });
});
