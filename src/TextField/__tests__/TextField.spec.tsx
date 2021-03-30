import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'test/test-utils';

import { TextField } from '../TextField';

describe('TextField', () => {
  it('should render correctly', () => {
    const { container } = render(<TextField label="placeholder" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with defaultValue', () => {
    const { container } = render(
      <TextField defaultValue="text field" label="placeholder" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with maxLength', () => {
    const { container } = render(
      <TextField maxLength={20} label="placeholder" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as textarea', () => {
    const { container } = render(
      <TextField textarea label="Text Field(textarea)" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onChange when change Textfield', () => {
    const onChange = jest.fn();

    const { container } = render(<TextField onChange={onChange} />);

    const textfield = container.querySelector('input') as HTMLInputElement;

    userEvent.type(textfield, 'change textfield');

    expect(textfield.value).toBe('change textfield');
  });

  it('should call onPressEnter when press enter on Textfield', () => {
    const onPressEnter = jest.fn();

    const { container } = render(<TextField onPressEnter={onPressEnter} />);

    const textfield = container.querySelector('input') as HTMLInputElement;

    userEvent.type(textfield, '{enter}');

    expect(onPressEnter).toBeCalled();
  });
});
