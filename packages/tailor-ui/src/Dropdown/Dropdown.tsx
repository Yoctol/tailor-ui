import React, { FC, ReactNode } from 'react';

import { Popover, PopoverProps } from '../Popover';
import { Position } from '../constants';

import DropdownContext from './DropdownContext';
import DropdownItem from './DropdownItem';
import DropdownSubList from './DropdownSubList';
import { Divider, List } from './styles';

export interface DropdownProps extends Omit<PopoverProps, 'content'> {
  overlay: ReactNode;
}

const Dropdown: FC<DropdownProps> & {
  List: typeof List;
  SubList: typeof DropdownSubList;
  Item: typeof DropdownItem;
  Divider: typeof Divider;
} = ({ children, position = Position.BOTTOM_LEFT, overlay, ...props }) => {
  return (
    <Popover
      p="0"
      position={position}
      content={(close) => (
        <DropdownContext.Provider value={{ close }}>
          {overlay}
        </DropdownContext.Provider>
      )}
      {...props}
    >
      {children}
    </Popover>
  );
};

Dropdown.List = List;
Dropdown.SubList = DropdownSubList;
Dropdown.Item = DropdownItem;
Dropdown.Divider = Divider;

export { Dropdown };
