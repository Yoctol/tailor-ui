import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseComboboxStateChange, useCombobox } from 'downshift6';

import { useFormField } from '../../FormField';

import SelectOptions from './SelectOptions';
import SelectSuffix from './SelectSuffix';
import { CREATE_OPTION, filter, isCreateOption, itemToString } from './utils';
import { SelectCreateOptionObject, SelectOption, SelectValue } from './types';
import { StyledSelect } from './styles';

interface SelectProps<T extends SelectOption = SelectOption, V = T | null> {
  id?: string;
  loading?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  width?: string | number;
  options: T[];
  value?: V;
  defaultValue?: V;
  onChange: (item: V) => void;
  placeholder?: string;
  onCreateOption?: (value: string) => void;
  formatCreateLabel?: (labelInfo: {
    value: string;
    active: boolean;
    hovered: boolean;
  }) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
}

const Select = <T extends SelectOption>({
  id,
  loading = false,
  searchable = false,
  clearable = false,
  creatable = false,
  disabled = false,
  width = 240,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  onCreateOption,
  formatCreateLabel = (info) => `Create new option: ${info.value}`,
  isValidNewOption = (optionValue) => optionValue.trim() !== '',
}: PropsWithChildren<SelectProps<T>>) => {
  const [invalid, labelId, setValue] = useFormField({
    id,
    value,
    defaultValue,
  });

  const selectRef = useRef<HTMLButtonElement>(null);
  const [searchValue, setSearchValue] = useState('');

  // Prevent display the useless error message
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args: any[]) => {
      if (/downshift: The ref prop "ref" from/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  const searchOptions =
    searchValue !== '' ? filter(options, searchValue) : options;
  const additionOptions: [SelectCreateOptionObject] | [] =
    creatable && isValidNewOption(searchValue)
      ? [
          {
            label: CREATE_OPTION,
            value: searchValue,
          },
        ]
      : [];

  const mergedOptions = [...searchOptions, ...additionOptions];

  const valueProps =
    typeof value !== 'undefined'
      ? {
          selectedItem: value,
        }
      : {
          initialSelectedItem: defaultValue,
        };

  const handleChange = ({
    selectedItem,
  }: UseComboboxStateChange<SelectValue | undefined>) => {
    const selection = selectedItem ?? null;

    if (isCreateOption(selection)) {
      if (onCreateOption) {
        setSearchValue('');
        onChange(null);
        onCreateOption(selection.value);
      }
    } else {
      onChange(selection as T);
      setValue(selection);
    }
  };

  const handleInputValueChange = ({
    inputValue = '',
    isOpen,
  }: UseComboboxStateChange<SelectValue | undefined>) => {
    if (isOpen && (searchable || creatable)) {
      if (inputValue === CREATE_OPTION) {
        setSearchValue('');
      } else {
        setSearchValue(inputValue);
      }
    }
  };

  const getDefaultHighlightIndex = () => {
    if (searchable && searchValue !== '') {
      return 0;
    }

    const index = searchOptions.findIndex(
      (item) => itemToString(item) === itemToString(value ?? defaultValue)
    );

    return index !== -1 ? index : 0;
  };

  const {
    selectedItem: currentSelectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    selectItem,
    isOpen,
  } = useCombobox({
    id: labelId,
    itemToString,
    items: mergedOptions,
    inputValue: searchValue,
    ...valueProps,
    defaultHighlightedIndex: getDefaultHighlightIndex(),
    scrollIntoView: () => {},
    onSelectedItemChange: handleChange,
    onInputValueChange: handleInputValueChange,
  });

  const currentSelectedItemString = itemToString(currentSelectedItem);

  return (
    <div
      {...getComboboxProps({
        style: {
          width,
        },
      })}
    >
      <StyledSelect
        {...getToggleButtonProps({
          ref: selectRef,
          disabled: disabled || loading,
        })}
        invalid={invalid}
        focused={isOpen}
      >
        <input
          {...getInputProps({
            ...((searchable || creatable) && isOpen
              ? {}
              : {
                  value: currentSelectedItemString,
                }),
            readOnly: (!searchable && !creatable) || loading,
            placeholder: placeholder ?? currentSelectedItemString,
          })}
        />
        <SelectSuffix
          loading={loading}
          hasSelectedItem={currentSelectedItem !== null}
          clearable={clearable}
          onClearIconClick={() => selectItem(null as any)}
          visible={isOpen}
        />
      </StyledSelect>
      <SelectOptions
        selectRef={selectRef}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        visible={isOpen}
        options={mergedOptions}
        highlightedIndex={highlightedIndex}
        currentSelectedItemString={currentSelectedItemString}
        formatCreateLabel={formatCreateLabel}
      />
    </div>
  );
};

export { Select };
