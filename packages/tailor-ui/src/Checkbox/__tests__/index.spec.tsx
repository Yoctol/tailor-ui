import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import Checkbox from '../Checkbox';
import { Box } from '../../Layout';

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

    fireEvent.click(checkbox);

    expect(onChange).toBeCalled();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <Checkbox checked data-testid="my-checkbox">
        Checkbox
      </Checkbox>
    );

    expect(getByTestId('my-checkbox')).toHaveAttribute('checked');
  });
});

describe('Checkbox.Group', () => {
  it('should render disabled checkbox if option set disabled as true', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Checkbox.Group
        direction="vertical"
        options={[
          { label: 'checkbox 1', value: 'check_1', disabled: true },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3' },
        ]}
        value={[]}
        onChange={onChange}
      />
    );

    const checkbox = container.querySelector('input[type=checkbox]');

    expect(checkbox).toBeDisabled();
  });

  it('should call onChange when checkbox is clicked', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Checkbox.Group
        direction="vertical"
        options={[
          { label: 'checkbox 1', value: 'check_1' },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3' },
        ]}
        value={[]}
        onChange={onChange}
      />
    );

    const checkbox = container.querySelector(
      'input[type=checkbox]'
    ) as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(onChange).toBeCalledWith(['check_1']);
  });

  it('should render vertical checkbox group', () => {
    const { container } = render(
      <Checkbox.Group
        direction="vertical"
        options={[
          { label: 'checkbox 1', value: 'check_1' },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3' },
        ]}
        value={[]}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('composition with Checkbox', () => {
    it('should render correctly', () => {
      const { container } = render(
        <Checkbox.Group value={[]}>
          <Box>
            <Checkbox value="check_1">checkbox 1</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_2">checkbox 2</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_3">checkbox 3</Checkbox>
          </Box>
        </Checkbox.Group>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onChange when checkbox is clicked', () => {
      const onChange = jest.fn();

      const { container } = render(
        <Checkbox.Group value={[]} onChange={onChange}>
          <Box>
            <Checkbox value="check_1">checkbox 1</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_2">checkbox 2</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_3">checkbox 3</Checkbox>
          </Box>
        </Checkbox.Group>
      );

      const checkbox = container.querySelector(
        'input[type=checkbox]'
      ) as HTMLInputElement;

      fireEvent.click(checkbox);

      expect(onChange).toBeCalledWith(['check_1']);
    });
  });
});
