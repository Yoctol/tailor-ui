import React, { PureComponent, ReactNode } from 'react';
import { Spring, config } from 'react-spring';
import { createPortal, findDOMNode } from 'react-dom';

import ClickOutside from '../utils/ClickOutside';
import PortalElement from '../utils/PortalElement';

import Item from './Item';
import List from './List';
import SubList from './SubList';
import { Placement, Provider } from './DropdownContext';

const portalElement = new PortalElement();

export interface DropdownProps {
  /**
   * The component which this dropdown show up
   */
  children: (
    renderProps: { toggle: () => void; visible: boolean }
  ) => ReactNode;
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
}

class Dropdown extends PureComponent<DropdownProps> {
  static List: typeof List = List;

  static Item: typeof Item = Item;

  static SubList: typeof SubList = SubList;

  childrenDOM?: HTMLElement;

  listRef?: HTMLElement;

  state = {
    visible: false,
    handler: false,
  };

  componentDidMount() {
    this.childrenDOM = findDOMNode(this) as HTMLElement;
  }

  toggle = () => {
    const { visible } = this.state;
    const { onVisibleChange } = this.props;

    this.setState(() => ({
      visible: !visible,
    }));

    if (onVisibleChange) onVisibleChange(!visible);
  };

  handleClose = () => {
    const { onVisibleChange } = this.props;

    this.setState(() => ({ visible: false, handler: false }));

    if (onVisibleChange) onVisibleChange(false);
  };

  handleListRef = (ref: any) => {
    this.listRef = ref;
  };

  getOffset = () => {
    const rect = (this.childrenDOM as Element).getBoundingClientRect();

    const MARGIN_OFFSET = 5;

    const offsetHeight = this.listRef ? this.listRef.offsetHeight : 0;
    const offsetWidth = this.listRef ? this.listRef.offsetWidth : 0;

    const TOP_OFFSET_TOP = rect.top - offsetHeight - MARGIN_OFFSET;
    const BOTTOM_OFFSET_TOP = rect.top + rect.height + MARGIN_OFFSET;
    const LEFT_OFFSET_LEFT = rect.left + rect.width - offsetWidth;
    const RIGHT_OFFSET_RIGHT = rect.left;

    switch (this.props.placement) {
      case 'topRight':
        return {
          top: TOP_OFFSET_TOP,
          left: LEFT_OFFSET_LEFT,
        };
      case 'topLeft':
        return {
          top: TOP_OFFSET_TOP,
          left: RIGHT_OFFSET_RIGHT,
        };
      case 'bottomRight':
        return {
          top: BOTTOM_OFFSET_TOP,
          left: LEFT_OFFSET_LEFT,
        };
      case 'bottomLeft':
        return {
          top: BOTTOM_OFFSET_TOP,
          left: RIGHT_OFFSET_RIGHT,
        };
      default:
        return {};
    }
  };

  renderChildren = () => {
    const { children } = this.props;
    const { visible } = this.state;
    const { toggle } = this;
    return children({
      toggle,
      visible,
    });
  };

  renderOverlay = () => {
    const { overlay, placement = 'bottomLeft' } = this.props;
    const { visible } = this.state;

    if (!this.childrenDOM || this.childrenDOM instanceof Text) {
      return null;
    }

    const translateFrom = placement.startsWith('top') ? 10 : -10;

    const offset = this.getOffset();

    if (!this.state.handler) {
      window.addEventListener('scroll', this.handleClose, true);
      this.setState({ handler: true });
    }

    return (
      <ClickOutside
        bindRef={this.childrenDOM}
        onClickOutside={this.handleClose}
      >
        <Spring
          native
          from={{
            opacity: 0,
            transform: `translateY(${translateFrom}px)`,
          }}
          to={{
            opacity: visible ? 1 : 0,
            transform: `translateY(${visible ? 0 : translateFrom}px)`,
            visibility: visible ? 'visible' : 'hidden',
          }}
          config={config.stiff}
        >
          {styles => (
            <Provider
              value={{
                placement,
                offset,
                styles,
                onClick: this.handleClose,
                handleListRef: this.handleListRef,
              }}
            >
              {overlay}
            </Provider>
          )}
        </Spring>
      </ClickOutside>
    );
  };

  render() {
    return (
      <>
        {this.renderChildren()}
        {!portalElement.canUseDOM()
          ? null
          : createPortal(
              this.renderOverlay(),
              portalElement.getPortalElement()
            )}
      </>
    );
  }
}

export default Dropdown;
