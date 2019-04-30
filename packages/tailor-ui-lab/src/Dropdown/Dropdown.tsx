import React, { FunctionComponent, ReactNode } from 'react';

import { Position, Positions } from 'tailor-ui';

import Popover from '../Popover';

import DropdownContext from './DropdownContext';
import DropdownItem from './DropdownItem';
import DropdownSubList from './DropdownSubList';
import { Divider, List } from './styles';

interface DropdownProps {
  position: Positions;
  overlay: ReactNode;
}

const Dropdown: FunctionComponent<DropdownProps> & {
  List: typeof List;
  SubList: typeof DropdownSubList;
  Item: typeof DropdownItem;
  Divider: typeof Divider;
} = ({ children, position = Position.BOTTOM_LEFT, overlay }) => {
  return (
    <Popover
      p="0"
      position={position}
      content={close => (
        <DropdownContext.Provider value={{ close }}>
          {overlay}
        </DropdownContext.Provider>
      )}
    >
      {children}
    </Popover>
  );
};

Dropdown.List = List;
Dropdown.SubList = DropdownSubList;
Dropdown.Item = DropdownItem;
Dropdown.Divider = Divider;

export default Dropdown;
