import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'test/test-utils';

import { Box } from '../../Layout';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

describe('CheckboxGroup', () => {
  it('should render disabled checkbox if option set disabled as true', () => {
    const onChange = jest.fn();

    const { container } = render(
      <CheckboxGroup
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
      <CheckboxGroup
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

    userEvent.click(checkbox);

    expect(onChange).toBeCalledWith(['check_1']);
  });

  it('should render vertical checkbox group', () => {
    const { container } = render(
      <CheckboxGroup
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
        <CheckboxGroup value={[]}>
          <Box>
            <Checkbox value="check_1">checkbox 1</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_2">checkbox 2</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_3">checkbox 3</Checkbox>
          </Box>
        </CheckboxGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onChange when checkbox is clicked', () => {
      const onChange = jest.fn();

      const { container } = render(
        <CheckboxGroup value={[]} onChange={onChange}>
          <Box>
            <Checkbox value="check_1">checkbox 1</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_2">checkbox 2</Checkbox>
          </Box>
          <Box>
            <Checkbox value="check_3">checkbox 3</Checkbox>
          </Box>
        </CheckboxGroup>
      );

      const checkbox = container.querySelector(
        'input[type=checkbox]'
      ) as HTMLInputElement;

      userEvent.click(checkbox);

      expect(onChange).toBeCalledWith(['check_1']);
    });
  });
});
