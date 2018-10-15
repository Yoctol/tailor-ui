import React, { PureComponent, ReactNode } from 'react';

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

class Dropdown extends PureComponent<IDropdownProps> {
  static List: typeof List = List;

  static Item: typeof Item = Item;

  static SubList: typeof SubList = SubList;

  static defaultProps = {
    placement: 'bottomLeft',
  };

  renderOverlay = ({
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
      {this.props.overlay}
    </Provider>
  );

  render() {
    const { placement, onVisibleChange, children } = this.props;

    return (
      <Trigger
        appendFor="dropdown"
        placement={placement}
        onVisibleChange={onVisibleChange}
        popup={this.renderOverlay}
      >
        {children}
      </Trigger>
    );
  }
}

export default Dropdown;
