import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Select } from '../Select';

const DEFAULT_OPTIONS = [
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Apple', value: 'apple' },
  { label: 'Mango', value: 'mango' },
];

const DEFAULT_SELECT_OPTION = { label: 'Banana', value: 'banana' };

const ControlSelect = (props: Record<string, any>) => {
  const [value, setValue] = useState(DEFAULT_SELECT_OPTION);

  return (
    <Select
      value={value}
      onChange={(newValue) => setValue(newValue)}
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
    render(<ControlSelect data-testid="select" disabled />);

    const select = screen.getByTestId('select');
    userEvent.click(select);

    expect(screen.queryByTestId('select-menu')).toBeNull();
  });

  it('should not open menu when loading', () => {
    render(<ControlSelect data-testid="select" loading />);

    const select = screen.getByTestId('select');
    userEvent.click(select);

    expect(screen.queryByTestId('select-menu')).toBeNull();
  });

  it.skip('should change value correctly when click option', async () => {
    render(<ControlSelect data-testid="select" />);

    const input = screen.getByTestId('select-input') as HTMLInputElement;
    expect(input.value).toBe('Banana');

    const select = screen.getByTestId('select');
    userEvent.click(select);

    const orange = screen.getByTestId('select-item-1');
    userEvent.click(orange);

    expect(input.value).toBe('Orange');
  });

  describe.skip('searchable', () => {
    it('should search correctly when change select input', async () => {
      render(<ControlSelect searchable data-testid="select" />);

      const input = screen.getByTestId('select-input') as HTMLInputElement;
      expect(input.value).toBe('Banana');

      const select = screen.getByTestId('select');
      userEvent.click(select);

      expect(input.value).toBe('');
      expect(input.placeholder).toBe('Banana');

      userEvent.type(input, 'Orange');

      const orange = screen.getByTestId('select-item-0');
      userEvent.click(orange);

      expect(screen.getByTestId('select-item-0')).toHaveTextContent('Orange');
      expect(screen.queryByTestId('select-item-1')).toBeNull();
      expect(screen.queryByText('Banana')).toBeNull();
    });
  });

  describe.skip('creatable', () => {
    it('should create successfully when pass creatable', async () => {
      const CreatableSelect = () => {
        const [loading, setLoading] = useState(false);
        const [value, setValue] = useState(DEFAULT_SELECT_OPTION);
        const [options, setOptions] = useState(DEFAULT_OPTIONS);

        return (
          <Select
            creatable
            data-testid="select"
            loading={loading}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            options={options}
            isValidNewOption={(name) =>
              !options.map((option) => option.value).includes(name) &&
              name.trim() !== ''
            }
            onCreateOption={(name) => {
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

      render(<CreatableSelect />);

      const input = screen.getByTestId('select-input') as HTMLInputElement;
      expect(input.value).toBe('Banana');

      const select = screen.getByTestId('select');
      userEvent.click(select);

      userEvent.type(input, 'XXXXXX');

      const newOption = screen.getByText('Create new option: XXXXXX');
      expect(newOption).toBeInTheDocument();
      userEvent.click(newOption);

      expect(screen.getByTitle('loading')).toBeInTheDocument();

      jest.runOnlyPendingTimers();

      expect(screen.queryByTitle('loading')).toBeNull();
      expect(input.value).toBe('XXXXXX');

      jest.useRealTimers();
    });

    it('should not creatable when option is not valid', async () => {
      const CreatableSelect = () => {
        const [value, setValue] = useState(DEFAULT_SELECT_OPTION);

        return (
          <Select
            creatable
            data-testid="select"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            options={DEFAULT_OPTIONS}
            isValidNewOption={(name) => name === 'NOT_VALID'}
          />
        );
      };

      render(<CreatableSelect />);

      const input = screen.getByTestId('select-input') as HTMLInputElement;
      expect(input.value).toBe('Banana');

      const select = screen.getByTestId('select');
      userEvent.click(select);

      userEvent.type(input, 'NOT_VALID');

      const newOption = screen.queryByText('Create new option: NOT_VALID');
      expect(newOption).toBeInTheDocument();
    });
  });

  describe('clearable', () => {
    it('should clear value when click clear icon', async () => {
      const ClearableSelect = () => {
        const [value, setValue] = useState(DEFAULT_SELECT_OPTION);

        return (
          <Select
            clearable
            data-testid="select"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            options={DEFAULT_OPTIONS}
          />
        );
      };

      render(<ClearableSelect />);

      const input = screen.getByTestId('select-input') as HTMLInputElement;
      expect(input.value).toBe('Banana');

      const clearIcon = screen.getByTestId('select-clear-icon');
      userEvent.click(clearIcon);

      expect(input.value).toBe('');
    });
  });

  describe('multiple', () => {
    const MultipleSelect = () => {
      const [loading, setLoading] = useState(false);
      const [value, setValue] = useState([
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ]);
      const [options, setOptions] = useState([
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]);

      return (
        <Select
          creatable
          data-testid="select"
          loading={loading}
          width="360px"
          multiple
          value={value}
          onChange={(newValue) => setValue(newValue)}
          options={options}
          isValidNewOption={(name) =>
            !options.map((option) => option.label).includes(name) &&
            name.trim() !== ''
          }
          onCreateOption={(name) => {
            const newOption = { label: name, value: name };
            setLoading(true);
            setTimeout(() => {
              setOptions([...options, newOption]);
              setValue((prevValue) => [...prevValue, newOption]);
              setLoading(false);
            }, 1000);
          }}
        />
      );
    };

    it('should display multi option', () => {
      const { baseElement } = render(<MultipleSelect />);

      expect(baseElement).toMatchSnapshot();

      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Orange')).toBeInTheDocument();
    });

    it.skip('should add selected option when click other option', async () => {
      render(<MultipleSelect />);

      const select = screen.getByTestId('select');
      userEvent.click(select);

      userEvent.click(screen.getByText('Apple'));

      expect(screen.getByTestId('select-menu')).toBeInTheDocument();

      userEvent.click(screen.getByText('Mango'));

      userEvent.click(select);

      expect(screen.queryByTestId('select-menu')).toBeNull();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Mango')).toBeInTheDocument();
    });

    it('should remove selected option when click clear ', async () => {
      render(<MultipleSelect />);

      userEvent.click(
        screen.getByTestId('select-selected-option-1-clear-icon')
      );
      userEvent.click(
        screen.getByTestId('select-selected-option-0-clear-icon')
      );

      expect(screen.queryByText('Banana')).toBeNull();
      expect(screen.queryByText('Orange')).toBeNull();
    });

    it.skip('should remove last selected option when press backspace ', async () => {
      render(<MultipleSelect />);

      const select = screen.getByTestId('select');
      userEvent.click(select);

      const input = screen.getByTestId('select-input') as HTMLInputElement;
      userEvent.type(input, '{backspace}');
      userEvent.click(select);

      expect(screen.queryByTestId('select-menu')).toBeNull();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Orange')).toBeNull();
    });
  });
});
