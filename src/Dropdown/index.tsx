import React, { PureComponent, ReactNode } from 'react';
import observeRect from '@reach/observe-rect';
import { Transition, config } from 'react-spring';
import { createPortal, findDOMNode } from 'react-dom';

import ClickOutside from '../utils/ClickOutside';
import PortalElement from '../utils/PortalElement';

import Item from './Item';
import List from './List';
import SubList from './SubList';
import { Placement, Provider } from './DropdownContext';

const portalElement = new PortalElement();

export interface IDropdownProps {
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

interface IDropdownState {
  visible: boolean;
  rect: DOMRect | object;
  listRef?: HTMLElement;
}

class Dropdown extends PureComponent<IDropdownProps, IDropdownState> {
  static List: typeof List = List;

  static Item: typeof Item = Item;

  static SubList: typeof SubList = SubList;

  static defaultProps = {
    placement: 'bottomLeft',
  };

  childrenDOM?: HTMLElement;

  rectObserver?: any;

  state = {
    visible: false,
    listRef: undefined,
    rect: {},
  };

  componentDidMount() {
    this.childrenDOM = findDOMNode(this) as HTMLElement;

    this.rectObserver = observeRect(this.childrenDOM, (rect: DOMRect) => {
      this.setState({ rect });
    });
  }

  toggle = () => {
    const { visible } = this.state;
    const { onVisibleChange } = this.props;

    if (!visible) {
      this.rectObserver.observe();
      this.setState(() => ({ visible: true }));

      if (onVisibleChange) {
        onVisibleChange(true);
      }
    } else {
      this.handleClose();
    }
  };

  handleClose = () => {
    const { visible } = this.state;
    const { onVisibleChange } = this.props;

    if (visible) {
      this.rectObserver.unobserve();

      this.setState(() => ({ visible: false }));
      if (onVisibleChange) {
        onVisibleChange(false);
      }
    }
  };

  handleListRef = (listRef: HTMLElement) => {
    this.setState(() => ({ listRef }));
  };

  getOffset = () => {
    const { rect, listRef } = this.state;

    const MARGIN_OFFSET = 5;

    const offsetHeight = listRef ? (listRef as any).offsetHeight : 0;
    const offsetWidth = listRef ? (listRef as any).offsetWidth : 0;

    const TOP_OFFSET_TOP = (rect as DOMRect).top - offsetHeight - MARGIN_OFFSET;
    const BOTTOM_OFFSET_TOP =
      (rect as DOMRect).top + (rect as DOMRect).height + MARGIN_OFFSET;
    const LEFT_OFFSET_LEFT =
      (rect as DOMRect).left + (rect as DOMRect).width - offsetWidth;
    const RIGHT_OFFSET_RIGHT = (rect as DOMRect).left;

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
        return {
          top: 0,
          left: 0,
        };
    }
  };

  renderChildren = () => {
    const { children } = this.props;
    const { visible } = this.state;

    return children({
      toggle: this.toggle,
      visible,
    });
  };

  renderOverlay = () => {
    const { overlay, placement = 'bottomLeft' } = this.props;
    const { visible, listRef } = this.state;

    if (!this.childrenDOM || this.childrenDOM instanceof Text) {
      return null;
    }

    const offset = this.getOffset();

    const translateFrom = placement.startsWith('top') ? 10 : -10;

    return (
      <Transition
        native
        keys={visible ? 'visible' : 'hidden'}
        from={{
          opacity: 0,
          transform: `translate3d(0, ${translateFrom}px, 0)`,
        }}
        enter={{
          opacity: 1,
          transform: `translate3d(0, ${0}px, 0)`,
        }}
        leave={{
          opacity: 0,
          transform: `translate3d(0, ${translateFrom}px, 0)`,
        }}
        config={{
          ...config.stiff,
          restSpeedThreshold: 1,
          restDisplacementThreshold: 0.1,
        }}
      >
        {visible &&
          (styles => (
            <ClickOutside
              bindRefs={[this.childrenDOM, listRef]}
              onClickOutside={this.handleClose}
            >
              <Provider
                value={{
                  offset,
                  styles,
                  handleClose: this.handleClose,
                  handleListRef: this.handleListRef,
                }}
              >
                {overlay}
              </Provider>
            </ClickOutside>
          ))}
      </Transition>
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
