import React from 'react';

import { fireEvent, mockRaf, render, useMockRaf } from 'test/test-utils';

import { Popconfirm } from '../Popconfirm';

describe('Popconfirm', () => {
  useMockRaf();

  it('should render correctly', () => {
    const { baseElement } = render(
      <Popconfirm visible content="Content">
        <button type="button">button</button>
      </Popconfirm>
    );

    mockRaf.flushSpring();

    expect(baseElement).toMatchSnapshot();
  });

  it('should trigger onConfirm correctly', () => {
    const confirmFn = jest.fn();

    const { getByText } = render(
      <Popconfirm visible content="Content" onConfirm={confirmFn}>
        <button type="button">button</button>
      </Popconfirm>
    );

    mockRaf.flushSpring();

    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(confirmFn).toBeCalled();
  });

  it('should trigger onCancel correctly', () => {
    const cancelFn = jest.fn();

    const { getByText } = render(
      <Popconfirm visible content="Content" onCancel={cancelFn}>
        <button type="button">button</button>
      </Popconfirm>
    );

    mockRaf.flushSpring();

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(cancelFn).toBeCalled();
  });
});
