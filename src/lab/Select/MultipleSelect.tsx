import React, {
  PropsWithoutRef,
  ReactNode,
  Ref,
  forwardRef,
  useContext,
  useRef,
} from 'react';
import {
  UseMultipleSelectionStateChange,
  useCombobox,
  useMultipleSelection,
} from 'downshift6';

import { ClickOutsideContext } from '../../Popover';
import { Flex } from '../../Layout';
import { Tag } from '../../Tag';
import { useFormField } from '../../FormField';

import SelectOptions from './SelectOptions';
import SelectSuffix from './SelectSuffix';
import { SelectOption, SelectOptionObject } from './types';
import { StyledSelect } from './styles';
import {
  isCreateOption,
  itemToString,
  useIgnoreDownshiftUselessWarning,
  useSelectOptions,
} from './utils';

interface MultipleSelectProps<T extends SelectOption = SelectOption> {
  id?: string;
  loading?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  width?: string | number;
  options: T[];
  value?: T[];
  defaultValue?: T[];
  onChange: (item: T[]) => void;
  placeholder?: string;
  onCreateOption?: (value: string) => void;
  formatCreateLabel?: (labelInfo: {
    value: string;
    active: boolean;
    hovered: boolean;
  }) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
}

const MultipleSelect = forwardRef(function MultipleSelect<
  T extends SelectOption
>(
  {
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
  }: PropsWithoutRef<MultipleSelectProps<T>>,
  ref: Ref<HTMLDivElement>
) {
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
    selectedItems,
  }: UseMultipleSelectionStateChange<T | SelectOptionObject>) => {
    const selection = selectedItems ?? [];
    const createOption = selection.find(isCreateOption);

    if (createOption && onCreateOption) {
      setSearchValue('');
      onCreateOption(createOption.value);
    } else {
      onChange(selectedItems as T[]);
      setValue(selectedItems);
    }
  };

  const {
    getSelectedItemProps,
    getDropdownProps,
    selectedItems,
    setSelectedItems,
  } = useMultipleSelection({
    onSelectedItemsChange: handleChange,
    selectedItems: value,
    initialSelectedItems: defaultValue,
  });

  const {
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    isOpen,
  } = useCombobox({
    id: labelId,
    itemToString,
    items: selectOptions,
    inputValue: searchValue,
    scrollIntoView: () => {},
    onIsOpenChange: ({ isOpen: visible }) => setHasChild(Boolean(visible)),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      if (
        type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
        type === useCombobox.stateChangeTypes.ItemClick
      ) {
        setSearchValue('');

        const { selectedItem } = changes;
        const selectedItemString = itemToString(selectedItem);

        if (selectedItems.map(itemToString).includes(selectedItemString)) {
          setSelectedItems(
            selectedItems.filter(
              (item) => itemToString(item) !== selectedItemString
            )
          );
        } else {
          setSelectedItems([...selectedItems, selectedItem as T]);
        }

        const newHighlightedIndex = options.findIndex(
          (item) => itemToString(item) === selectedItemString
        );

        return {
          ...changes,
          highlightedIndex: newHighlightedIndex,
          isOpen: true, // keep the menu open after selection.
        };
      }

      return changes;
    },
    onStateChange: ({ inputValue, type }) => {
      if (
        type === useCombobox.stateChangeTypes.InputChange &&
        typeof inputValue !== 'undefined'
      ) {
        setSearchValue(inputValue);
      }
    },
  });

  return (
    <div
      {...getComboboxProps({
        ref,
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
        multiple
        invalid={invalid}
        focused={isOpen}
      >
        <Flex flex="auto" flexWrap="wrap">
          {selectedItems.map((selectedItem, index) => (
            <Tag
              key={itemToString(selectedItem)}
              closable
              disabled={loading || disabled}
              style={{ marginBottom: 2 }}
              onClose={() =>
                setSelectedItems(
                  selectedItems.filter(
                    (item) => itemToString(item) !== itemToString(selectedItem)
                  )
                )
              }
              {...getSelectedItemProps({ selectedItem, index })}
            >
              {itemToString(selectedItem)}
            </Tag>
          ))}
          <input
            {...getInputProps(
              getDropdownProps({
                preventKeyAction: isOpen,
                readOnly: (!searchable && !creatable) || loading,
                placeholder,
              })
            )}
          />
        </Flex>
        <SelectSuffix
          loading={loading}
          hasSelectedItem={selectedItems.length > 0}
          clearable={clearable}
          onClearIconClick={() => setSelectedItems([])}
          visible={isOpen}
        />
      </StyledSelect>
      <SelectOptions
        selectRef={selectRef}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        visible={isOpen}
        options={selectOptions}
        selectedItems={selectedItems}
        highlightedIndex={highlightedIndex}
        formatCreateLabel={formatCreateLabel}
      />
    </div>
  );
});

export { MultipleSelect };
