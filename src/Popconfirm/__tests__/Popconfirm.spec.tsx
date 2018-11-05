import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import Button from '../../Button';

import Popconfirm from '..';

describe('Popconfirm', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Popconfirm content="Test Popconfirm" defaultVisible>
        <Button>Button</Button>
      </Popconfirm>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('#click children', () => {
    it('should render popconfirm to document when click children', () => {
      const { getByText } = render(
        <Popconfirm content="Test Popconfirm">
          <Button>Button</Button>
        </Popconfirm>
      );

      const button = getByText('Button');

      fireEvent.click(button);

      const popconfirm = getByText('Test Popconfirm');

      expect(popconfirm).toBeInTheDocument();
    });

    it('should hidden popconfirm when click children twice', () => {
      const { getByText } = render(
        <Popconfirm content="Test Popconfirm">
          <Button>Button</Button>
        </Popconfirm>
      );

      const button = getByText('Button');

      fireEvent.click(button);
      fireEvent.click(button);

      const popconfirm = getByText('Test Popconfirm');

      expect(popconfirm).not.toBeVisible();
    });
  });

  describe('#cancel', () => {
    it('should hidden popconfirm when click cancel button', () => {
      const { getByText } = render(
        <Popconfirm content="Test Popconfirm" cancelText="cancel">
          <Button>Button</Button>
        </Popconfirm>
      );

      const button = getByText('Button');

      fireEvent.click(button);

      const cancelButton = getByText('cancel');

      fireEvent.click(cancelButton);

      const popconfirm = getByText('Test Popconfirm');

      expect(popconfirm).not.toBeVisible();
    });

    it('should trigger onCancel callback when click cancel button', () => {
      const onCancel = jest.fn();

      const { getByText } = render(
        <Popconfirm
          content="Test Popconfirm"
          cancelText="cancel"
          onCancel={onCancel}
        >
          <Button>Button</Button>
        </Popconfirm>
      );

      const button = getByText('Button');

      fireEvent.click(button);

      const cancelButton = getByText('cancel');

      fireEvent.click(cancelButton);

      expect(onCancel).toBeCalled();
    });
  });

  describe('#confirm', () => {
    it('should hidden popconfirm when click confirm button', () => {
      const { getByText } = render(
        <Popconfirm content="Test Popconfirm" confirmText="confirm">
          <Button>Button</Button>
        </Popconfirm>
      );

      const button = getByText('Button');

      fireEvent.click(button);

      const confirmButton = getByText('confirm');

      fireEvent.click(confirmButton);

      const popconfirm = getByText('Test Popconfirm');

      expect(popconfirm).not.toBeVisible();
    });

    it('should trigger onConfirm callback when click confirm button', () => {
      const onConfirm = jest.fn();

      const { getByText } = render(
        <Popconfirm
          content="Test Popconfirm"
          confirmText="confirm"
          onConfirm={onConfirm}
        >
          <Button>Button</Button>
        </Popconfirm>
      );

      const button = getByText('Button');

      fireEvent.click(button);

      const confirmButton = getByText('confirm');

      fireEvent.click(confirmButton);

      expect(onConfirm).toBeCalled();
    });
  });
});
