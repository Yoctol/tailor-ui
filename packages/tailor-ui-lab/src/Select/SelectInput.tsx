import React, { ChangeEventHandler, forwardRef } from 'react';
import { pick } from 'ramda';

import { AutoSizeInput } from '../AutoSizeInput';

import { Option } from './SelectOptions';
import { getDataTestId, itemToString } from './utils';

export interface SelectInputProps {
  visible: boolean;
  searchable: boolean;
  creatable: boolean;
  multiple: boolean;
  inputValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  selectedItem: Option;
  selectedItems: Option[];
  removeItem: (item: Option) => void;
  placeholder: string;
  getInputProps: () => any;
  'data-testid'?: string;
}

const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  function SelectInput(
    {
      visible,
      searchable,
      creatable,
      multiple,
      inputValue,
      onChange,
      selectedItem,
      selectedItems,
      removeItem,
      placeholder,
      getInputProps,
      ...props
    },
    ref
  ) {
    return (
      <AutoSizeInput
        ref={ref}
        {...getDataTestId(props, 'input')}
        fontSize={16}
        autoComplete="off"
        {...pick(
          [
            'aria-autocomplete',
            'aria-activedescendant',
            'aria-controls',
            'aria-labelledby',
            'id',
          ],
          getInputProps()
        )}
        {...(visible && (searchable || creatable || multiple)
          ? {
              value: inputValue,
              onChange,
              onKeyDown(event) {
                if (
                  multiple &&
                  event.key === 'Backspace' &&
                  !event.currentTarget.value
                ) {
                  removeItem(selectedItems[selectedItems.length - 1]);
                }
              },
              placeholder:
                selectedItem && !multiple
                  ? itemToString(selectedItem)
                  : placeholder,
            }
          : {
              value: itemToString(selectedItem),
              readOnly: true,
              placeholder,
            })}
      />
    );
  }
);

export default SelectInput;
