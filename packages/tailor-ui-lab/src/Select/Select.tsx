import Downshift from 'downshift';
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Flex, Position } from 'tailor-ui';

import Popover from '../Popover';

import ClearIcon from './ClearIcon';
import SelectArrow from './SelectArrow';
import SelectOptions, { ObjectOption, Option } from './SelectOptions';
import { Loading, SelectWrapper, StyledSelect } from './styles';
import { itemToString } from './utils';

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
  formatCreateLabel?: (createText: string) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
  onCreateOption?: (value: string) => void;
}

const Select: FunctionComponent<SelectProps> = ({
  width = 240,
  size = 'md',
  creatable = false,
  clearable = false,
  disabled = false,
  loading = false,
  // TODO: impelment multiple usage
  // multiple = false,
  searchable = false,
  options,
  value,
  defaultValue = null,
  placeholder = '',
  menu,
  itemSize = 36,
  optionsMaxHeight = 180,
  onChange,
  noOptionsMessage,
  formatCreateLabel,
  isValidNewOption,
  onCreateOption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectWidth, setSelectWidth] = useState<number | string>('auto');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (containerRef.current) {
      setSelectWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const handleChange = (selection: Option) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }

    const isCreate =
      selection && (selection as ObjectOption).label === 'CREATE_OPTION';

    if (onCreateOption && isCreate) {
      onCreateOption((selection as ObjectOption).value);
    }

    if (onChange) {
      onChange(isCreate ? null : selection);
    }

    setVisible(false);
  };

  const defaultHighlightedIndex =
    options.findIndex(
      option => itemToString(option) === itemToString(value || defaultValue)
    ) || null;

  return (
    <Downshift
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
      onInputValueChange={newInputValue => setInputValue(newInputValue)}
      onChange={handleChange}
      {...{
        scrollIntoView: () => {},
      } as any}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getToggleButtonProps,
        highlightedIndex,
        selectedItem,
        clearSelection,
      }) => (
        <SelectWrapper width={width} {...getRootProps()}>
          <Popover
            visible={visible}
            position={Position.BOTTOM}
            minWidth={selectWidth}
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
                itemSize={itemSize}
                optionsMaxHeight={optionsMaxHeight}
                getItemProps={getItemProps}
                options={options}
                inputValue={inputValue}
                menu={menu}
                highlightedIndex={highlightedIndex}
                selectedItem={selectedItem}
                noOptionsMessage={noOptionsMessage}
                formatCreateLabel={formatCreateLabel}
                isValidNewOption={isValidNewOption}
              />
            }
          >
            <StyledSelect
              ref={containerRef}
              size={size}
              focused={visible}
              {...getToggleButtonProps({
                disabled: disabled || loading,
                onClick: () => {
                  if (!visible && (searchable || creatable)) {
                    setInputValue('');

                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }
                },
              })}
            >
              <Flex flex="auto">
                <input
                  ref={inputRef}
                  {...(visible && (searchable || creatable)
                    ? (getInputProps({
                        placeholder: selectedItem
                          ? selectedItem.value
                          : placeholder,
                      }) as any)
                    : {
                        value: selectedItem ? selectedItem.value : '',
                        placeholder,
                        onChange: () => {},
                      })}
                />
              </Flex>
              {loading && <Loading />}
              {clearable && selectedItem && (
                <ClearIcon clearSelection={clearSelection} />
              )}
              <SelectArrow on={visible} />
            </StyledSelect>
          </Popover>
        </SelectWrapper>
      )}
    </Downshift>
  );
};

export default Select;
