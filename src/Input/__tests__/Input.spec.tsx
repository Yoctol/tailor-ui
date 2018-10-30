import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import Button from '../../Button';

import Input from '..';

import Textarea from '../Textarea';

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
    const { container } = render(
      <Input suffix={<Button type="success">Send It</Button>} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onChange when change input', () => {
    const onChange = jest.fn();
    const { container } = render(<Input onChange={onChange} />);

    const input = container.querySelector('input');

    fireEvent.change(input, {
      target: {
        value: 'change input',
      },
    });

    expect(input.value).toBe('change input');
  });

  // it('should auto select on input when pass autoSelect', () => {
  //   const { container } = render(
  //     <Input defaultValue="default value" autoSelect />
  //   );

  //   const input = container.querySelector('input');

  //   const selection = window.getSelection();

  //   expect(container.activeElement).toBe(input);
  //   expect(selection).toBe('default value');
  // });

  // it('should call onPressEnter when press enter on input', () => {
  //   const onPressEnter = jest.fn();
  //   const { container } = render(<Input onPressEnter={onPressEnter} />);

  //   const input = container.querySelector('input');

  //   fireEvent.change(input, {
  //     target: {
  //       value: 'change input',
  //     },
  //   });

  //   fireEvent.keyPress(input, {
  //     key: 'Enter',
  //   });

  //   expect(onPressEnter).toBeCalledWith({ key: 'Enter' });
  // });
});

describe('Textarea', () => {
  it('should render correctly', () => {
    const { container } = render(<Textarea placeholder="placeholder" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with minRows & maxRows', () => {
    const { container } = render(
      <Textarea id="demo" placeholder="placeholder" minRows={3} maxRows={6} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
