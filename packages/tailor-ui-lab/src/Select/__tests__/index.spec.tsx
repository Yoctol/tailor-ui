import React, { useState } from 'react';

import { fireEvent, render, waitForElement } from 'test/test-utils';

import Select from '../Select';

const DEFAULT_OPTIONS = [
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Apple', value: 'apple' },
  { label: 'Mango', value: 'mango' },
];

const DEFAULT_SELECT_OPTION = { label: 'Banana', value: 'banana' };

const ControlSelect = (props: any) => {
  const [value, setValue] = useState<any>(DEFAULT_SELECT_OPTION);

  return (
    <Select
      value={value}
      onChange={newValue => setValue(newValue)}
      options={DEFAULT_OPTIONS}
      {...props}
    />
  );
};

describe('Select', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Select options={DEFAULT_OPTIONS} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should not open menu when disabled', () => {
    const { getByTestId, queryByTestId } = render(
      <ControlSelect data-testid="select" disabled />
    );

    const select = getByTestId('select');
    fireEvent.click(select);

    expect(queryByTestId('select-menu')).not.toBeInTheDocument();
  });

  it('should not open menu when loading', () => {
    const { getByTestId, queryByTestId } = render(
      <ControlSelect data-testid="select" loading />
    );

    const select = getByTestId('select');
    fireEvent.click(select);

    expect(queryByTestId('select-menu')).not.toBeInTheDocument();
  });

  it('should change value correctly when click option', async () => {
    const { getByTestId } = render(<ControlSelect data-testid="select" />);

    const input = getByTestId('select-input') as HTMLInputElement;
    expect(input.value).toBe('Banana');

    const select = getByTestId('select');
    fireEvent.click(select);

    await waitForElement(() => getByTestId('select-menu'));

    const orange = getByTestId('select-item-1');
    fireEvent.click(orange);

    expect(input.value).toBe('Orange');
  });

  it('should search correctly when change select input', async () => {
    const { getByTestId, queryByTestId, queryByText } = render(
      <ControlSelect searchable data-testid="select" />
    );

    const input = getByTestId('select-input') as HTMLInputElement;
    expect(input.value).toBe('Banana');

    const select = getByTestId('select');
    fireEvent.click(select);

    await waitForElement(() => getByTestId('select-menu'));

    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Banana');

    fireEvent.change(input, {
      target: {
        value: 'Orange',
      },
    });

    const orange = getByTestId('select-item-0');
    fireEvent.click(orange);

    expect(getByTestId('select-item-0')).toHaveTextContent('Orange');
    expect(queryByTestId('select-item-1')).not.toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
  });

  it('should create successfully when pass creatable', async () => {
    const CreatableSelect = () => {
      const [loading, setLoading] = useState(false);
      const [value, setValue] = useState<any>(DEFAULT_SELECT_OPTION);
      const [options, setOptions] = useState(DEFAULT_OPTIONS);

      return (
        <Select
          creatable
          data-testid="select"
          loading={loading}
          value={value}
          onChange={newValue => setValue(newValue)}
          options={options}
          isValidNewOption={name =>
            !options.map(option => option.value).includes(name) &&
            name.trim() !== ''
          }
          onCreateOption={name => {
            const newOption = { label: name, value: name };
            setLoading(true);
            setTimeout(() => {
              setOptions([...options, newOption]);
              setValue(newOption);
              setLoading(false);
            }, 1000);
          }}
        />
      );
    };

    jest.useFakeTimers();

    const { getByTestId, queryByTitle, getByText, getByTitle } = render(
      <CreatableSelect />
    );

    const input = getByTestId('select-input') as HTMLInputElement;
    expect(input.value).toBe('Banana');

    const select = getByTestId('select');
    fireEvent.click(select);

    await waitForElement(() => getByTestId('select-menu'));

    fireEvent.change(input, {
      target: {
        value: 'XXXXXX',
      },
    });

    const newOption = getByText('Create new option: XXXXXX');
    expect(newOption).toBeInTheDocument();
    fireEvent.click(newOption);

    expect(getByTitle('loading')).toBeInTheDocument();

    jest.runAllTimers();

    expect(queryByTitle('loading')).not.toBeInTheDocument();
    expect(input.value).toBe('XXXXXX');
  });

  it('should not creatable when option is not valid', async () => {
    const CreatableSelect = () => {
      const [value, setValue] = useState<any>(DEFAULT_SELECT_OPTION);

      return (
        <Select
          creatable
          data-testid="select"
          value={value}
          onChange={newValue => setValue(newValue)}
          options={DEFAULT_OPTIONS}
          isValidNewOption={name => name === 'NOT_VALID'}
        />
      );
    };

    const { getByTestId, queryByText } = render(<CreatableSelect />);

    const input = getByTestId('select-input') as HTMLInputElement;
    expect(input.value).toBe('Banana');

    const select = getByTestId('select');
    fireEvent.click(select);

    await waitForElement(() => getByTestId('select-menu'));

    fireEvent.change(input, {
      target: {
        value: 'NOT_VALID',
      },
    });

    const newOption = queryByText('Create new option: NOT_VALID');
    expect(newOption).toBeInTheDocument();
  });
});
