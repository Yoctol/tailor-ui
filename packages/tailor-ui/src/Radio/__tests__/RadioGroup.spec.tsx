import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import { Box } from '../../Layout';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

describe('RadioGroup', () => {
  it('should render disabled radio if option set disabled as true', () => {
    const onChange = jest.fn();

    const { container } = render(
      <RadioGroup
        direction="vertical"
        options={[
          { label: 'radio 1', value: 'radio_1', disabled: true },
          { label: 'radio 2', value: 'radio_2' },
          { label: 'radio 3', value: 'radio_3' },
        ]}
        value=""
        onChange={onChange}
      />
    );

    const radio1 = container.querySelector('input[type=radio]');

    expect(radio1).toBeDisabled();
  });

  it('should call onChange when radio is clicked', () => {
    const onChange = jest.fn();

    const { container } = render(
      <RadioGroup
        direction="vertical"
        options={[
          { label: 'radio 1', value: 'radio_1' },
          { label: 'radio 2', value: 'radio_2' },
          { label: 'radio 3', value: 'radio_3' },
        ]}
        value=""
        onChange={onChange}
      />
    );

    const radio1 = container.querySelector(
      'input[type=radio]'
    ) as HTMLInputElement;

    fireEvent.click(radio1);

    expect(onChange).toBeCalledWith('radio_1');
  });

  it('should render vertical radio group', () => {
    const { container } = render(
      <RadioGroup
        direction="vertical"
        options={[
          { label: 'radio 1', value: 'radio_1' },
          { label: 'radio 2', value: 'radio_2' },
          { label: 'radio 3', value: 'radio_3' },
        ]}
        value=""
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('composition with Radio', () => {
    it('should render correctly', () => {
      const { container } = render(
        <RadioGroup value="">
          <Box>
            <Radio value="radio_1">Radio 1</Radio>
          </Box>
          <Box>
            <Radio value="radio_2">Radio 2</Radio>
          </Box>
          <Box>
            <Radio value="radio_3">Radio 3</Radio>
          </Box>
        </RadioGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onChange when radio is clicked', () => {
      const onChange = jest.fn();

      const { container } = render(
        <RadioGroup value="" onChange={onChange}>
          <Box>
            <Radio value="radio_1">Radio 1</Radio>
          </Box>
          <Box>
            <Radio value="radio_2">Radio 2</Radio>
          </Box>
          <Box>
            <Radio value="radio_3">Radio 3</Radio>
          </Box>
        </RadioGroup>
      );

      const radio1 = container.querySelector(
        'input[type=radio]'
      ) as HTMLInputElement;

      fireEvent.click(radio1);

      expect(onChange).toBeCalledWith('radio_1');
    });
  });
});
