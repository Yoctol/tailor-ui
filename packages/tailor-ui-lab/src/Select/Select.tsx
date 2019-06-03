import Downshift from 'downshift';
import React, { FunctionComponent, ReactNode, useRef, useState } from 'react';

import { Flex, Popover, Position, useFormField } from 'tailor-ui';

import ClearIcon from './ClearIcon';
import MultiDownshift from './MultiDownshift';
import SelectArrow from './SelectArrow';
import SelectInput from './SelectInput';
import SelectOptions, { ObjectOption, Option } from './SelectOptions';
import SelectedOption from './SelectedOption';
import { Loading, SelectWrapper, StyledSelect } from './styles';
import { getDataTestId, itemToString } from './utils';

interface SelectProps {
  id?: string;
  name?: string;
  className?: string;
  width?: string | number;
  size?: 'sm' | 'md' | 'lg';
  creatable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  options: Option[];
  value?: Option;
  defaultValue?: Option;
  placeholder?: string;
  menu?: ReactNode;
  itemSize?: number;
  optionsMaxHeight?: number;
  onChange?: (option: Option) => void;
  noOptionsMessage?: () => ReactNode;
  formatCreateLabel?: (labelInfo: {
    value: string;
    active: boolean;
    hovered: boolean;
  }) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
  onCreateOption?: (value: string) => void;
  'data-testid'?: string;
}

const Select: FunctionComponent<SelectProps> = ({
  id,
  width = 240,
  size = 'md',
  creatable = false,
  clearable = false,
  disabled = false,
  loading = false,
  multiple = false,
  searchable = false,
  options,
  value,
  defaultValue,
  placeholder = '',
  menu,
  itemSize = 36,
  optionsMaxHeight = 180,
  onChange,
  noOptionsMessage,
  formatCreateLabel,
  isValidNewOption,
  onCreateOption,
  ...props
}) => {
  const [invalid, labelId, setValue] = useFormField({
    id,
    value,
    defaultValue,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (selection: Option) => {
    if (inputRef.current && !multiple) {
      inputRef.current.blur();
    }

    const isCreate =
      selection && (selection as ObjectOption).label === 'CREATE_OPTION';

    if (isCreate && onCreateOption) {
      onCreateOption((selection as ObjectOption).value);
    }

    if (!isCreate && onChange) {
      onChange(selection);
      setValue(selection);
    }

    if (!multiple || isCreate) {
      setVisible(false);
    } else {
      setInputValue('');
    }
  };

  const defaultHighlightedIndex = multiple
    ? null
    : options.findIndex(
        option => itemToString(option) === itemToString(value || defaultValue)
      ) || null;

  const RenderComponent = multiple ? MultiDownshift : Downshift;

  return (
    <RenderComponent
      id={labelId}
      selectedItem={value}
      isOpen={visible}
      initialSelectedItem={defaultValue}
      defaultHighlightedIndex={defaultHighlightedIndex}
      stateReducer={(state, changes) => {
        // if the user is opening the menu, then let's make sure
        // that the highlighted index is set to the selected index
        if (
          typeof changes === 'object' &&
          changes.type === Downshift.stateChangeTypes.mouseUp
        ) {
          return {};
        }

        return changes;
      }}
      itemToString={itemToString}
      inputValue={inputValue}
      onInputValueChange={newInputValue => {
        if (!multiple && newInputValue !== 'CREATE_OPTION') {
          setInputValue(newInputValue);
        }
      }}
      onChange={handleChange}
      {...{
        scrollIntoView: () => {},
      } as any}
    >
      {({
        id: downshiftId,

        getRootProps,
        getMenuProps,
        getItemProps,
        getInputProps,
        highlightedIndex,
        selectedItem,
        clearSelection,

        selectedItems = [],
        getRemoveButtonProps,
        removeItem,
      }: any) => (
        <SelectWrapper
          {...getRootProps({
            style: { width },
          })}
        >
          <Popover
            visible={visible}
            position={Position.BOTTOM_LEFT}
            minWidth={width}
            onVisibleChange={newVisible => {
              if (disabled || loading) {
                return;
              }

              if (!newVisible && inputRef.current) {
                inputRef.current.blur();
              }

              setVisible(newVisible);
            }}
            p="0"
            content={
              <SelectOptions
                visible={visible}
                creatable={creatable}
                searchable={searchable}
                multiple={multiple}
                itemSize={itemSize}
                optionsMaxHeight={optionsMaxHeight}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                options={options}
                inputValue={inputValue}
                menu={menu}
                highlightedIndex={highlightedIndex}
                selectedItem={selectedItem}
                selectedItems={selectedItems}
                noOptionsMessage={noOptionsMessage}
                formatCreateLabel={formatCreateLabel}
                isValidNewOption={isValidNewOption}
                data-testid={props['data-testid']}
              />
            }
          >
            <StyledSelect
              id={downshiftId}
              {...getDataTestId(props)}
              invalid={invalid}
              size={size}
              focused={visible}
              disabled={disabled || loading}
              onClick={() => {
                if (!visible) {
                  if (searchable || creatable || multiple) {
                    setInputValue('');
                  }
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }
              }}
            >
              <Flex
                flex="auto"
                flexWrap="wrap"
                alignItems="center"
                overflow="hidden"
              >
                {multiple &&
                  selectedItems.map((item: Option) => (
                    <SelectedOption
                      key={itemToString(item)}
                      {...getRemoveButtonProps({
                        item,
                        onClick: () => {
                          if (inputRef.current) {
                            inputRef.current.focus();
                          }
                        },
                      })}
                    >
                      <span>{itemToString(item)}</span>
                    </SelectedOption>
                  ))}
                <SelectInput
                  ref={inputRef}
                  visible={visible}
                  searchable={searchable}
                  creatable={creatable}
                  multiple={multiple}
                  inputValue={inputValue}
                  placeholder={placeholder}
                  selectedItem={selectedItem}
                  selectedItems={selectedItems}
                  removeItem={removeItem}
                  onChange={event => setInputValue(event.currentTarget.value)}
                  getInputProps={getInputProps}
                  data-testid={props['data-testid']}
                />
              </Flex>
              {clearable && selectedItem && (
                <ClearIcon clearSelection={clearSelection} />
              )}
              {loading ? (
                <Loading title="loading" />
              ) : (
                <SelectArrow on={visible} />
              )}
            </StyledSelect>
          </Popover>
        </SelectWrapper>
      )}
    </RenderComponent>
  );
};

export { Select };
