import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import Tag from '../Tag';

describe('Tag', () => {
  it('should render tags correctly', () => {
    const { queryByText } = render(
      <div>
        <Tag>Tag A</Tag>
        <Tag>Tag B</Tag>
      </div>
    );

    const tagA = queryByText('Tag A');
    const tagB = queryByText('Tag B');

    expect(tagA).toBeInTheDocument();
    expect(tagB).toBeInTheDocument();
  });

  it('should render closable tag', async () => {
    const { container, queryByText } = render(<Tag closable>Tag A</Tag>);

    const closeIcon = container.querySelector('i') as HTMLElement;

    fireEvent.click(closeIcon);

    const tagA = queryByText('Tag A');

    await wait(() => {
      expect(tagA).not.toBeVisible();
    });
  });

  it('should call onClosed when close icon is clicked', async () => {
    const onClosed = jest.fn();

    const { container, queryByText } = render(
      <Tag closable onClosed={onClosed}>
        Tag A
      </Tag>
    );

    const closeIcon = container.querySelector('i') as HTMLElement;

    fireEvent.click(closeIcon);

    await wait(() => expect(onClosed).toBeCalled());

    const tagA = queryByText('Tag A');
    expect(tagA).not.toBeVisible();
  });
});
