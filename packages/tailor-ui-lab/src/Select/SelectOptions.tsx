import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import VirtualList from 'react-tiny-virtual-list';
import { GetItemPropsOptions } from 'downshift';
import { MdHighlightOff } from 'react-icons/md';

import { Flex, Heading, Icon } from 'tailor-ui';

import { StyledSelectOption } from './styles';
import { fuzzyFilter, itemToString } from './utils';

export interface ObjectOption {
  label: string;
  value: string;
}

export type Option = ObjectOption | string | number | null;

const DefaultNoOptionsMessage: FunctionComponent = () => (
  <Flex
    py="3"
    alignItems="center"
    justifyContent="center"
    style={{ cursor: 'not-allowed' }}
  >
    <Icon type={MdHighlightOff} mr="2" />
    <Heading.h5 color="gray500">No Data</Heading.h5>
  </Flex>
);

interface SelectOptionsProps {
  visible: boolean;
  creatable: boolean;
  searchable: boolean;
  itemSize: number;
  optionsMaxHeight: number;
  getItemProps: (option: GetItemPropsOptions<Option>) => any;
  options: Option[];
  inputValue: string;
  menu?: ReactNode;
  highlightedIndex: number | null;
  selectedItem: null | Option;
  noOptionsMessage?: () => ReactNode;
  formatCreateLabel?: (createText: string) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
}

const SelectOptions: FunctionComponent<SelectOptionsProps> = ({
  visible,
  creatable,
  searchable,
  itemSize,
  optionsMaxHeight,
  getItemProps,
  options,
  inputValue,
  menu,
  highlightedIndex,
  selectedItem,
  noOptionsMessage = () => <DefaultNoOptionsMessage />,
  formatCreateLabel = value => `Create new option: ${value}`,
  isValidNewOption = value => value.trim() !== '',
}) => {
  const [prevSearchValue, setPrevSearchValue] = useState(inputValue);

  useEffect(() => {
    // save previous inputValue to prevent options reset when options animating fade out
    if (visible) {
      setPrevSearchValue(inputValue);
    }
  }, [inputValue, visible]);

  let items = options;

  // filter options when searchable or creatable
  if (searchable || creatable) {
    const filter = fuzzyFilter(itemToString);
    items =
      prevSearchValue.trim() === ''
        ? options
        : filter(options, prevSearchValue);
  }

  // if creatable is true, append create option to options
  if (visible && creatable && isValidNewOption(inputValue)) {
    items = [
      ...items,
      {
        label: 'CREATE_OPTION',
        value: inputValue,
      },
    ];
  }

  if (items.length === 0) {
    return <>{noOptionsMessage()}</>;
  }

  return (
    <>
      <VirtualList
        width="100%"
        height={Math.min(items.length * itemSize, optionsMaxHeight)}
        itemSize={itemSize}
        itemCount={items.length}
        scrollToIndex={highlightedIndex || 0}
        overscanCount={3}
        scrollToAlignment={'auto' as any}
        renderItem={({ index, style }) => {
          const option = items[index];
          const optionString = itemToString(option);
          const hovered = visible && highlightedIndex === index;
          const active = selectedItem
            ? itemToString(selectedItem) === optionString
            : false;
          const content =
            (option as ObjectOption).label === 'CREATE_OPTION'
              ? formatCreateLabel((option as ObjectOption).value)
              : optionString;

          return (
            <StyledSelectOption
              key={optionString}
              active={active}
              hovered={hovered}
              style={style}
              {...getItemProps({
                index,
                item: option,
              })}
            >
              {content}
            </StyledSelectOption>
          );
        }}
      />
      {menu}
    </>
  );
};

export default SelectOptions;
