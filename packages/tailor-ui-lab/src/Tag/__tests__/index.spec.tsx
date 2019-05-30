import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import Tag from '../Tag';

describe('Tag', () => {
  it('should render tag', () => {
    const { container } = render(<Tag>Tailor UI</Tag>);

    expect(container).toMatchSnapshot();
  });

  it('should render tag with prefix', () => {
    const { container } = render(<Tag prefix="1">Tailor UI</Tag>);

    expect(container).toMatchSnapshot();
  });

  it('should render invalid style tag', () => {
    const { container } = render(<Tag invalid>Tailor UI</Tag>);

    expect(container).toMatchSnapshot();
  });

  it('should render editable tag and call onChange', async () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <Tag editable onChange={onChange}>
        Foo
      </Tag>
    );

    const tagText = getByText('Foo');
    fireEvent.click(tagText);

    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Foo Bar' } });
    expect(input.value).toBe('Foo Bar');

    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onChange).toBeCalledWith('Foo', 'Foo Bar');
  });

  it('should render closable tag', async () => {
    const { container, queryByText } = render(<Tag closable>Tag A</Tag>);

    const closeIcon = container.querySelector('i');

    fireEvent.click(closeIcon as HTMLElement);

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

    const closeIcon = container.querySelector('i');

    fireEvent.click(closeIcon as HTMLElement);

    await wait(() => expect(onClosed).toBeCalled());

    const tagA = queryByText('Tag A');
    expect(tagA).not.toBeVisible();
  });

  it('should call canClose when close icon is clicked and still visbile', () => {
    const canClose = jest.fn().mockResolvedValue(false);

    const { container, queryByText } = render(
      <Tag closable canClose={canClose}>
        Tailor UI
      </Tag>
    );

    const closeIcon = container.querySelector('i');

    fireEvent.click(closeIcon as HTMLElement);

    const tag = queryByText('Tailor UI');

    expect(canClose).toBeCalled();
    expect(tag).toBeVisible();
  });

  it('should call canClose when close icon is clicked and close correct', async () => {
    const canClose = jest.fn().mockResolvedValue(true);

    const { container, queryByText } = render(
      <Tag closable canClose={canClose}>
        Tailor UI
      </Tag>
    );

    const closeIcon = container.querySelector('i');

    fireEvent.click(closeIcon as HTMLElement);

    const tag = queryByText('Tailor UI');

    expect(canClose).toBeCalled();
    await (() => expect(tag).not.toBeVisible());
  });
});
