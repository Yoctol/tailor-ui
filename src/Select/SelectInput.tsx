import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
} from 'react';
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
  onBlur?: FocusEventHandler<HTMLInputElement>;
  options: Option[];
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
      options,
      selectedItem,
      selectedItems,
      removeItem,
      placeholder,
      getInputProps,
      onBlur,
      ...props
    },
    ref
  ) {
    const inputProps = getInputProps();

    return (
      <AutoSizeInput
        ref={ref}
        {...getDataTestId(props, 'input')}
        fontSize={16}
        onBlur={onBlur}
        autoComplete="off"
        {...pick(
          [
            'aria-autocomplete',
            'aria-activedescendant',
            'aria-controls',
            'aria-labelledby',
            'onBlur',
            'id',
          ],
          inputProps
        )}
        {...(visible && (searchable || creatable || multiple)
          ? {
              value: inputValue,
              onChange,
              onKeyDown(event) {
                inputProps.onKeyDown(event);
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
              value: itemToString(
                typeof selectedItem !== 'object' &&
                  options.every((option) => typeof option === 'object')
                  ? options.find(
                      (option) =>
                        (option as Record<string, any>).value === selectedItem
                    )
                  : selectedItem
              ),
              onKeyDown: inputProps.onKeyDown,
              placeholder,
            })}
      />
    );
  }
);

export default SelectInput;
