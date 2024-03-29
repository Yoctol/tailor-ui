import Downshift from 'downshift3';
import React, {
  FocusEventHandler,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Flex } from '../Layout';
import { Popover } from '../Popover';
import { Position } from '../constants';
import { useFormField } from '../FormField';

import ClearIcon from './ClearIcon';
import MultiDownshift from './MultiDownshift';
import SelectArrow from './SelectArrow';
import SelectInput from './SelectInput';
import SelectOptions, {
  CreateOption,
  Option,
  SelectedValue,
} from './SelectOptions';
import SelectedOption from './SelectedOption';
import { Loading, SelectWrapper, StyledSelect } from './styles';
import { getDataTestId, itemToString } from './utils';

export interface SelectProps<V extends SelectedValue = SelectedValue> {
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
  value?: V;
  defaultValue?: V;
  placeholder?: string;
  menu?: ReactNode;
  itemSize?: number;
  optionsMaxHeight?: number;
  onChange?: (option: V) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  noOptionsMessage?: () => ReactNode;
  formatCreateLabel?: (labelInfo: {
    value: string;
    active: boolean;
    hovered: boolean;
  }) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
  onCreateOption?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  'data-testid'?: string;
}

const Select = <V extends SelectedValue>({
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
  onVisibleChange,
  onBlur,
  ...props
}: PropsWithChildren<SelectProps<V>>) => {
  const [invalid, labelId, setValue] = useFormField({
    id,
    value,
    defaultValue,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectWidth, setSelectWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (visible && wrapperRef.current) {
      setSelectWidth(wrapperRef.current.offsetWidth);
    }
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  }, [visible, onVisibleChange]);

  const handleChange = useCallback(
    (selection: V | CreateOption) => {
      if (inputRef.current && !multiple) {
        inputRef.current.blur();
      }

      const isCreate =
        selection && (selection as CreateOption).label === 'CREATE_OPTION';

      if (isCreate && onCreateOption) {
        onCreateOption((selection as CreateOption).value);
      }

      if (!isCreate && onChange) {
        onChange(selection as V);
        setValue(selection);
      }

      if (!multiple || isCreate) {
        setVisible(false);
      } else {
        setInputValue('');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, onChange, onCreateOption, setValue]
  );

  const getHighlightedIndex = useCallback(
    (item: Option) => {
      if (multiple) {
        return null;
      }

      const index = options.findIndex(
        (option) => itemToString(option) === itemToString(item)
      );

      if (index === null) {
        return null;
      }

      return index;
    },
    [multiple, options]
  );

  const RenderComponent = useMemo(
    () => (multiple ? MultiDownshift : Downshift),
    [multiple]
  );

  return (
    <RenderComponent
      id={labelId}
      selectedItem={value}
      isOpen={visible}
      initialSelectedItem={defaultValue}
      defaultHighlightedIndex={getHighlightedIndex(
        (value || defaultValue) as Option
      )}
      stateReducer={(state, changes) => {
        // if the user is opening the menu, then let's make sure
        // that the highlighted index is set to the selected index
        if (
          typeof changes === 'object' &&
          changes.type === Downshift.stateChangeTypes.clickItem
        ) {
          return {
            ...changes,
            highlightedIndex: getHighlightedIndex(changes.selectedItem),
          };
        }

        return changes;
      }}
      itemToString={itemToString}
      inputValue={inputValue}
      onInputValueChange={(newInputValue) => {
        if (!multiple && newInputValue !== 'CREATE_OPTION') {
          setInputValue(newInputValue);
        }
      }}
      onChange={handleChange}
      {...({
        scrollIntoView: () => {},
      } as any)}
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
            ref: wrapperRef,
            style: { width },
          })}
        >
          <Popover
            visible={visible}
            position={Position.BOTTOM_LEFT}
            minWidth={selectWidth}
            onVisibleChange={(newVisible) => {
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
              multiple={multiple}
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
                  (selectedItems as Option[]).map((item, index) => (
                    <SelectedOption
                      key={itemToString(item)}
                      index={index}
                      size={size}
                      data-testid={props['data-testid']}
                      removeButtonProps={getRemoveButtonProps({
                        item,
                        onClick: () => {
                          if (inputRef.current) {
                            inputRef.current.focus();
                          }
                        },
                      })}
                    >
                      {itemToString(item)}
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
                  options={options}
                  selectedItem={selectedItem}
                  selectedItems={selectedItems}
                  removeItem={removeItem}
                  onChange={(event) => setInputValue(event.currentTarget.value)}
                  onBlur={onBlur}
                  getInputProps={getInputProps}
                  data-testid={props['data-testid']}
                />
              </Flex>
              {clearable && selectedItem && (
                <ClearIcon
                  clearSelection={clearSelection}
                  data-testid={props['data-testid']}
                />
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
