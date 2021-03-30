import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Popconfirm } from '../Popconfirm';

describe('Popconfirm', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Popconfirm visible content="Content">
        <button type="button">button</button>
      </Popconfirm>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should trigger onConfirm correctly', () => {
    const confirmFn = jest.fn();

    render(
      <Popconfirm visible content="Content" onConfirm={confirmFn}>
        <button type="button">button</button>
      </Popconfirm>
    );

    const confirmButton = screen.getByText('Confirm');
    userEvent.click(confirmButton);

    expect(confirmFn).toBeCalled();
  });

  it('should trigger onCancel correctly', () => {
    const cancelFn = jest.fn();

    render(
      <Popconfirm visible content="Content" onCancel={cancelFn}>
        <button type="button">button</button>
      </Popconfirm>
    );

    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);

    expect(cancelFn).toBeCalled();
  });
});
