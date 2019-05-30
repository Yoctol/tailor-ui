import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import Button from '../../Button';
import Input from '../Input';

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

    const { container } = render(<Input onChange={onChange} />);

    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        value: 'change input',
      },
    });

    expect(input.value).toBe('change input');
    expect(onChange).toBeCalled();
  });

  it('should auto select on input when pass autoSelect', () => {
    const { container } = render(
      <Input defaultValue="default value" autoSelect />
    );

    const input = container.querySelector('input');

    expect(input).toHaveFocus();

    // window.getSelection is not implemented in jsdom, so it's hard to test selection here
    // - https://github.com/jsdom/jsdom/issues/317
    // const selection = window.getSelection();
    // expect(selection).toBe('default value');
  });

  it('should call onPressEnter when press enter on input', () => {
    const onPressEnter = jest.fn();

    const { container } = render(<Input onPressEnter={onPressEnter} />);

    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.keyPress(input, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onPressEnter).toBeCalled();
  });
});
