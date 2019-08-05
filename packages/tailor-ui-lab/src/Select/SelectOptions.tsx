import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import VirtualList from 'react-tiny-virtual-list';
import { GetItemPropsOptions } from 'downshift';
import { MdCheck, MdHighlightOff } from 'react-icons/md';

import { Box, Flex, Heading, Icon } from 'tailor-ui';

import { StyledSelectOption } from './styles';
import { fuzzyFilter, getDataTestId, itemToString } from './utils';

export type Option =
  | {
      label: string;
      value: string;
    }
  | string
  | number;

export interface CreateOption {
  label: 'CREATE_OPTION';
  value: string;
}

const DefaultNoOptionsMessage: FC = () => (
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
  multiple: boolean;
  itemSize: number;
  optionsMaxHeight: number;
  getMenuProps: () => any;
  getItemProps: (option: GetItemPropsOptions<Option>) => any;
  options: Option[];
  inputValue: string;
  menu?: ReactNode;
  highlightedIndex: number | null;
  selectedItem?: Option;
  selectedItems?: Option[];
  noOptionsMessage?: () => ReactNode;
  formatCreateLabel?: (labelInfo: {
    value: string;
    active: boolean;
    hovered: boolean;
  }) => ReactNode;
  isValidNewOption?: (value: string) => boolean;
  'data-testid'?: string;
}

const SelectOptions: FC<SelectOptionsProps> = ({
  visible,
  creatable,
  searchable,
  multiple,
  itemSize,
  optionsMaxHeight,
  getMenuProps,
  getItemProps,
  options,
  inputValue,
  menu,
  highlightedIndex,
  selectedItem,
  selectedItems,
  noOptionsMessage = () => <DefaultNoOptionsMessage />,
  formatCreateLabel = ({ value }) => `Create new option: ${value}`,
  isValidNewOption = value => value.trim() !== '',
  ...props
}) => {
  const [prevSearchValue, setPrevSearchValue] = useState(inputValue);
  const [createOptionWidth, setCreateOptionWidth] = useState<
    number | undefined
  >(undefined);
  const createOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // save previous inputValue to prevent options reset when options animating fade out
    if (visible) {
      setPrevSearchValue(inputValue);
    } else {
      setCreateOptionWidth(undefined);
    }

    if (createOptionRef.current) {
      setCreateOptionWidth(createOptionRef.current.scrollWidth + 10);
    }
  }, [inputValue, visible]);

  const filteredItems = useMemo(() => {
    // filter options when searchable or creatable or multiple
    if (searchable || creatable || multiple) {
      const filter = fuzzyFilter(itemToString);

      return prevSearchValue.trim() === ''
        ? options
        : filter(options, prevSearchValue);
    }

    return options;
  }, [creatable, multiple, options, prevSearchValue, searchable]);

  const additionItems = useMemo(() => {
    // if creatable is true, append create option to options
    if (creatable && isValidNewOption(visible ? inputValue : prevSearchValue)) {
      return [
        {
          label: 'CREATE_OPTION',
          value: visible ? inputValue : prevSearchValue,
        },
      ];
    }
    return [];
  }, [creatable, inputValue, isValidNewOption, prevSearchValue, visible]);

  const items = useMemo(() => [...filteredItems, ...additionItems], [
    additionItems,
    filteredItems,
  ]);

  if (items.length === 0) {
    return <>{noOptionsMessage()}</>;
  }

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      style={{
        minWidth: createOptionWidth,
      }}
      {...getDataTestId(props, 'menu')}
      {...getMenuProps()}
    >
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
          const isCreateOption =
            (option as CreateOption).label === 'CREATE_OPTION';
          const optionString = itemToString(option);
          const hovered = visible && highlightedIndex === index;
          const active = multiple
            ? (selectedItems as Option[])
                .map(itemToString)
                .includes(optionString)
            : itemToString(selectedItem) === optionString;
          const content = isCreateOption
            ? formatCreateLabel({
                value: (option as CreateOption).value,
                active,
                hovered,
              })
            : optionString;

          return (
            <StyledSelectOption
              key={optionString}
              active={active}
              hovered={hovered}
              style={style}
              {...getDataTestId(props, `item-${index}`)}
              {...getItemProps({
                index,
                item: option,
              })}
            >
              <div
                ref={isCreateOption ? createOptionRef : undefined}
                title={isCreateOption ? undefined : String(content)}
              >
                {multiple &&
                  (active ? (
                    <Icon
                      type={MdCheck}
                      fill={hovered ? 'light' : 'primaryLight'}
                      size="16"
                      mr="8px"
                    />
                  ) : (
                    <Box width="16px" mr="8px" />
                  ))}
                {content}
              </div>
            </StyledSelectOption>
          );
        }}
      />
      {menu}
    </Box>
  );
};

export default SelectOptions;
