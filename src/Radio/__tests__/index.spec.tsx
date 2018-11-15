import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import Box from '../../Grid/Box';

import Radio from '..';

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

    const radio = container.querySelector('input[type=radio]');

    fireEvent.click(radio);

    expect(onChange).toBeCalled();
  });
});

describe('Radio.Group', () => {
  it('should render disabled radio if option set disabled as true', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Radio.Group
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
      <Radio.Group
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

    const radio1 = container.querySelector('input[type=radio]');

    fireEvent.click(radio1);

    expect(onChange).toBeCalledWith('radio_1');
  });

  it('should render vertical radio group', () => {
    const { container } = render(
      <Radio.Group
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
        <Radio.Group value="">
          <Box>
            <Radio value="radio_1">Radio 1</Radio>
          </Box>
          <Box>
            <Radio value="radio_2">Radio 2</Radio>
          </Box>
          <Box>
            <Radio value="radio_3">Radio 3</Radio>
          </Box>
        </Radio.Group>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onChange when radio is clicked', () => {
      const onChange = jest.fn();

      const { container } = render(
        <Radio.Group value="" onChange={onChange}>
          <Box>
            <Radio value="radio_1">Radio 1</Radio>
          </Box>
          <Box>
            <Radio value="radio_2">Radio 2</Radio>
          </Box>
          <Box>
            <Radio value="radio_3">Radio 3</Radio>
          </Box>
        </Radio.Group>
      );

      const radio1 = container.querySelector('input[type=radio]');

      fireEvent.click(radio1);

      expect(onChange).toBeCalledWith('radio_1');
    });
  });
});
