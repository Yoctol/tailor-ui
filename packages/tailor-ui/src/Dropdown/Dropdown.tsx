import React, { FunctionComponent, ReactNode } from 'react';

import Trigger, { ChildrenRenderProps, PopupRenderProps } from '../Trigger';

import Item from './Item';
import List from './List';
import SubList from './SubList';
import { Placement, Provider } from './DropdownContext';

export interface DropdownProps {
  /**
   * The component which this dropdown show up
   */
  children: (renderProps: ChildrenRenderProps) => ReactNode;
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
  placement?: Placement;

  /**
   * a callback function takes an argument: visible, is executed when the visible state is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  autoTransferPlacement?: boolean;
}

const renderOverlay = (overlay: ReactNode) => ({
  styles,
  handleClose,
  handlePopupRef,
}: PopupRenderProps) => (
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

const Dropdown: FunctionComponent<DropdownProps> & {
  List: typeof List;
  Item: typeof Item;
  SubList: typeof SubList;
} = ({
  placement,
  onVisibleChange,
  overlay,
  autoTransferPlacement,
  children,
}) => (
  <Trigger
    trigger="click"
    placement={placement}
    onVisibleChange={onVisibleChange}
    autoTransferPlacement={autoTransferPlacement}
    popup={renderOverlay(overlay)}
  >
    {children}
  </Trigger>
);

Dropdown.defaultProps = {
  placement: 'bottomLeft',
};

Dropdown.List = List;
Dropdown.Item = Item;
Dropdown.SubList = SubList;

export default Dropdown;
