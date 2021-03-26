import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Button } from '../../Button';
import { Input } from '../Input';

describe('Input', () => {
  it('should render correctly', () => {
    const { container } = render(<Input placeholder="placeholder" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled input', () => {
    const { container } = render(<Input disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render different input size', () => {
    const { container } = render(<Input size="sm" placeholder="placeholder" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with text prefix', () => {
    const { container } = render(<Input prefix="Prefix" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with Button suffix', () => {
    const { container } = render(<Input suffix={<Button>Send It</Button>} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onChange when change input', () => {
    const onChange = jest.fn();

    render(<Input onChange={onChange} placeholder="input" />);

    const input = screen.getByPlaceholderText('input') as HTMLInputElement;

    userEvent.type(input, 'change input');

    expect(input.value).toBe('change input');
    expect(onChange).toBeCalled();
  });

  it('should auto select on input when pass autoSelect', () => {
    render(
      <Input autoSelect defaultValue="default value" placeholder="input" />
    );

    const input = screen.getByPlaceholderText('input') as HTMLInputElement;

    expect(input).toHaveFocus();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(13);
  });

  it('should call onPressEnter when press enter on input', () => {
    const onPressEnter = jest.fn();

    render(<Input onPressEnter={onPressEnter} placeholder="input" />);

    const input = screen.getByPlaceholderText('input') as HTMLInputElement;

    userEvent.type(input, '{enter}');

    expect(onPressEnter).toBeCalled();
  });
});
