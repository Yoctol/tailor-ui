import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import { Tag } from '../Tag';

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
    const { container } = render(
      <Tag editable onChange={onChange}>
        Foo
      </Tag>
    );

    const tagText = screen.getByText('Foo');
    userEvent.click(tagText);

    const input = container.querySelector('input') as HTMLInputElement;

    userEvent.type(input, '{selectall}{backspace}Foo Bar');
    expect(input.value).toBe('Foo Bar');

    userEvent.type(input, '{enter}');

    expect(onChange).toBeCalledWith('Foo', 'Foo Bar');
  });

  it('should render closable tag', async () => {
    const { container } = render(<Tag closable>Tag A</Tag>);

    const closeIcon = container.querySelector('i');

    userEvent.click(closeIcon as HTMLElement);
  });

  it('should call onClosed when close icon is clicked', async () => {
    const onClosed = jest.fn();

    const { container } = render(
      <Tag closable onClosed={onClosed}>
        Tag A
      </Tag>
    );

    const closeIcon = container.querySelector('i');

    userEvent.click(closeIcon as HTMLElement);

    await waitFor(() => expect(onClosed).toBeCalled());
  });

  it('should call canClose when close icon is clicked and still visible', () => {
    const canClose = jest.fn().mockResolvedValue(false);

    const { container } = render(
      <Tag closable canClose={canClose}>
        Tailor UI
      </Tag>
    );

    const closeIcon = container.querySelector('i');

    userEvent.click(closeIcon as HTMLElement);

    const tag = screen.getByText('Tailor UI');

    expect(canClose).toBeCalled();
    expect(tag).toBeInTheDocument();
  });

  it('should call canClose when close icon is clicked and close correct', async () => {
    const canClose = jest.fn().mockResolvedValue(true);

    const { container } = render(
      <Tag closable canClose={canClose}>
        Tailor UI
      </Tag>
    );

    const closeIcon = container.querySelector('i');

    userEvent.click(closeIcon as HTMLElement);

    expect(canClose).toBeCalled();
  });
});
