import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'test/test-utils';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const { container } = render(<Checkbox>Checkbox</Checkbox>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled checkbox', () => {
    const { container } = render(<Checkbox disabled>Checkbox</Checkbox>);

    const checkbox = container.querySelector('input[type=checkbox]');

    expect(checkbox).toBeDisabled();
  });

  it('should render checked checkbox', () => {
    const { container } = render(<Checkbox checked>Checkbox</Checkbox>);

    const checkbox = container.querySelector('input[type=checkbox]');

    expect(checkbox).toHaveAttribute('checked');
  });

  it('should call onChange when checkbox is clicked', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Checkbox checked onChange={onChange}>
        Checkbox
      </Checkbox>
    );

    const checkbox = container.querySelector(
      'input[type=checkbox]'
    ) as HTMLInputElement;

    userEvent.click(checkbox);

    expect(onChange).toBeCalled();
  });
});
