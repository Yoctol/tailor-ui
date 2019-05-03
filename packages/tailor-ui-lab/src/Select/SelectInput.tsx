import React, { ChangeEventHandler, forwardRef } from 'react';

import { Option } from './SelectOptions';
import { itemToString } from './utils';

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
    },
    ref
  ) {
    return (
      <input
        ref={ref}
        autoComplete="off"
        {...(visible && (searchable || creatable || multiple)
          ? {
              value: inputValue,
              onChange,
              onKeyUp(event) {
                if (multiple && event.key === 'Backspace' && !inputValue) {
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
