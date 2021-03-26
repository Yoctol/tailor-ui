import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'test/test-utils';

import { Radio } from '../Radio';

describe('Radio', () => {
  it('should render correctly', () => {
    const { container } = render(<Radio>Radio</Radio>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled radio', () => {
    const { container } = render(<Radio disabled>Radio</Radio>);

    const radio = container.querySelector('input[type=radio]');

    expect(radio).toBeDisabled();
  });

  it('should render checked radio', () => {
    const { container } = render(<Radio checked>Radio</Radio>);

    const radio = container.querySelector('input[type=radio]');

    expect(radio).toHaveAttribute('checked');
  });

  it('should call onChange when radio is clicked', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Radio onChange={onChange} checked={false}>
        Radio
      </Radio>
    );

    const radio = container.querySelector(
      'input[type=radio]'
    ) as HTMLInputElement;

    userEvent.click(radio);

    expect(onChange).toBeCalled();
  });
});
