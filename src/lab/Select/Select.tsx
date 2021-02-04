import React, { PropsWithChildren, ReactNode, useContext, useRef } from 'react';
import { UseComboboxStateChange, useCombobox } from 'downshift6';

import { ClickOutsideContext } from '../../Popover';
import { useFormField } from '../../FormField';

import SelectOptions from './SelectOptions';
import SelectSuffix from './SelectSuffix';
import {
  CREATE_OPTION,
  isCreateOption,
  itemToString,
  useIgnoreDownshiftUselessWarning,
  useSelectOptions,
} from './utils';
import { SelectOption, SelectValue } from './types';
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

  const { setHasChild } = useContext(ClickOutsideContext);
  const selectRef = useRef<HTMLButtonElement>(null);
  const { searchValue, setSearchValue, selectOptions } = useSelectOptions({
    options,
    creatable,
    isValidNewOption,
  });

  useIgnoreDownshiftUselessWarning();

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

    const index = selectOptions.findIndex(
      (item) => itemToString(item) === itemToString(value ?? defaultValue)
    );

    return index !== -1 ? index : 0;
  };

  const {
    selectedItem,
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
    items: selectOptions,
    inputValue: searchValue,
    selectedItem: value,
    initialSelectedItem: defaultValue,
    defaultHighlightedIndex: getDefaultHighlightIndex(),
    scrollIntoView: () => {},
    onSelectedItemChange: handleChange,
    onInputValueChange: handleInputValueChange,
    onIsOpenChange: ({ isOpen: visible }) => setHasChild(Boolean(visible)),
  });

  const selectedItemString = itemToString(selectedItem);

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
                  value: selectedItemString,
                }),
            readOnly: (!searchable && !creatable) || loading,
            placeholder: placeholder ?? selectedItemString,
          })}
        />
        <SelectSuffix
          loading={loading}
          hasSelectedItem={selectedItem !== null}
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
        options={selectOptions}
        selectedItem={selectedItem}
        highlightedIndex={highlightedIndex}
        formatCreateLabel={formatCreateLabel}
      />
    </div>
  );
};

export { Select };
