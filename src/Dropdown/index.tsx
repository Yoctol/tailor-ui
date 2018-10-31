import React, { ReactNode, SFC } from 'react';

import Trigger, { IChildrenRenderProps, IPopupRenderProps } from '../Trigger';

import Item from './Item';
import List from './List';
import SubList from './SubList';
import { Placement, Provider } from './DropdownContext';

export interface IDropdownProps {
  /**
   * The component which this dropdown show up
   */
  children: (renderProps: IChildrenRenderProps) => ReactNode;
  /**
   * The wrapper component's display style
   */
  display?: string;
  /**
   * The content in this dropdown component
   */
  overlay: ReactNode;
  /**
   * The position base on the children component
   */
  placement: Placement;

  /**
   * a callback function takes an argument: visible, is executed when the visible state is changed
   */
  onVisibleChange?: (visible: boolean) => void;
}

const renderOverlay = (overlay: ReactNode) => ({
  styles,
  handleClose,
  handlePopupRef,
}: IPopupRenderProps) => (
  <Provider
    value={{
      styles,
      handleClose,
      handleListRef: handlePopupRef,
    }}
  >
    {overlay}
  </Provider>
);

const Dropdown: SFC<IDropdownProps> & {
  List: typeof List;
  Item: typeof Item;
  SubList: typeof SubList;
} = ({ placement, onVisibleChange, overlay, children }) => (
  <Trigger
    trigger="click"
    appendFor="dropdown"
    placement={placement}
    onVisibleChange={onVisibleChange}
    popup={renderOverlay(overlay)}
  >
    {children}
  </Trigger>
);

Dropdown.List = List;
Dropdown.Item = Item;
Dropdown.SubList = SubList;

export default Dropdown;
