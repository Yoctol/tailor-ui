import Popover from '@reach/popover';
import React, {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { MdCheck } from 'react-icons/md';
import { useVirtual } from 'react-virtual';

import { Box } from '../../Layout';
import { Ellipsis } from '../../Ellipsis';
import { Icon } from '../../Icon';
import { Stack } from '../../Stack';
import { Tooltip } from '../../Tooltip';

import { SelectOption, SelectValue } from './types';
import { StyledPopover, StyledSelectOption } from './styles';
import {
  isCreateOption,
  isObjectOption,
  itemToString,
  positionMatchWidth,
} from './utils';

interface SelectOptionsProps {
  selectRef: RefObject<HTMLButtonElement>;
  visible: boolean;
  getMenuProps: any;
  getItemProps: any;
  options: SelectOption[];
  selectedItem?: SelectValue;
  selectedItems?: SelectOption[];
  highlightedIndex: number;
  formatCreateLabel: (labelInfo: {
    value: string;
    active: boolean;
    hovered: boolean;
  }) => ReactNode;
}

const SelectOptions: FC<SelectOptionsProps> = ({
  selectRef,
  getMenuProps,
  getItemProps,
  visible,
  options,
  selectedItem,
  selectedItems,
  highlightedIndex,
  formatCreateLabel,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { virtualItems, totalSize, scrollToIndex } = useVirtual({
    size: options.length,
    parentRef: listRef,
    estimateSize: useCallback(() => 36, []),
    overscan: 3,
  });

  useEffect(() => {
    if (visible && highlightedIndex !== -1) {
      scrollToIndex(highlightedIndex);
    }
  }, [visible, scrollToIndex, highlightedIndex]);

  return (
    <Stack>
      {(stackingOrder) => (
        <Popover
          targetRef={selectRef}
          hidden={!visible}
          position={positionMatchWidth}
          style={{ zIndex: stackingOrder }}
        >
          <StyledPopover {...getMenuProps({ ref: listRef })}>
            {visible && (
              <div style={{ height: totalSize }}>
                {virtualItems.map((virtualRow) => {
                  const item = options[virtualRow.index];
                  const itemString = itemToString(item);
                  const itemDisabled =
                    (isObjectOption(item) && item.disabled) ?? false;
                  const hovered = highlightedIndex === virtualRow.index;
                  const active = selectedItems
                    ? selectedItems.map(itemToString).includes(itemString)
                    : itemToString(selectedItem) === itemString;
                  const content = isCreateOption(item)
                    ? formatCreateLabel({
                        value: item.value,
                        active,
                        hovered,
                      })
                    : itemString;
                  const hint = isObjectOption(item) ? item.hint : undefined;

                  return (
                    <StyledSelectOption
                      key={itemString}
                      hovered={hovered}
                      active={active}
                      {...getItemProps({
                        item,
                        index: virtualRow.index,
                        disabled: itemDisabled,
                        style: {
                          height: virtualRow.size,
                          transform: `translateY(${virtualRow.start}px)`,
                        },
                      })}
                    >
                      {selectedItems && (
                        <Box
                          display="inline-flex"
                          flex="none"
                          width="16px"
                          mr="8px"
                        >
                          {active && (
                            <Icon
                              type={MdCheck}
                              fill={hovered ? 'light' : 'primaryLight'}
                              size="16px"
                            />
                          )}
                        </Box>
                      )}
                      {hint ? (
                        <Tooltip content={hint} mouseLeaveDelay={0}>
                          <div style={{ width: '100%' }}>{content}</div>
                        </Tooltip>
                      ) : (
                        <Ellipsis>{content}</Ellipsis>
                      )}
                    </StyledSelectOption>
                  );
                })}
              </div>
            )}
          </StyledPopover>
        </Popover>
      )}
    </Stack>
  );
};

export default SelectOptions;
