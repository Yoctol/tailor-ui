import Popover, { positionMatchWidth } from '@reach/popover';
import React, {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useVirtual } from 'react-virtual';

import { Ellipsis } from '../../Ellipsis';
import { Stack } from '../../Stack';

import { SelectOption } from './types';
import { StyledPopover, StyledSelectOption } from './styles';
import { isCreateOption, isObjectOption, itemToString } from './utils';

interface SelectOptionsProps {
  selectRef: RefObject<HTMLButtonElement>;
  visible: boolean;
  getMenuProps: any;
  getItemProps: any;
  options: SelectOption[];
  highlightedIndex: number;
  currentSelectedItemString: string;
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
  highlightedIndex,
  currentSelectedItemString,
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
                  const active = currentSelectedItemString === itemString;
                  const content = isCreateOption(item)
                    ? formatCreateLabel({
                        value: item.value,
                        active,
                        hovered,
                      })
                    : itemString;

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
                      <Ellipsis>{content}</Ellipsis>
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
