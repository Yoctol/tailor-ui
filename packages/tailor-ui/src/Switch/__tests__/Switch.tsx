import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import { Switch } from '../Switch';

describe('Switch', () => {
  it('should render correctly', () => {
    const { container } = render(<Switch />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled switch', () => {
    const { container } = render(<Switch disabled />);

    const switchInput = container.querySelector('input[type=checkbox]');

    expect(switchInput).toBeDisabled();
  });

  it('should render checked switch', () => {
    const { container } = render(<Switch checked />);

    const switchInput = container.querySelector('input[type=checkbox]');

    expect(switchInput).toHaveAttribute('checked');
  });

  it('should call onChange when switch is clicked', () => {
    const onChange = jest.fn();

    const { container } = render(<Switch checked onChange={onChange} />);

    const switchInput = container.querySelector(
      'input[type=checkbox]'
    ) as HTMLInputElement;

    fireEvent.click(switchInput);

    expect(onChange).toBeCalled();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(<Switch checked data-testid="my-switch" />);

    expect(getByTestId('my-switch')).toHaveAttribute('checked');
  });
});
