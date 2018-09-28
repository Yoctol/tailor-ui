import React, { PureComponent, ReactNode } from 'react';
import observeRect from '@reach/observe-rect';
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

interface DropdownState {
  visible: boolean;
  rect: DOMRect | object;
}

class Dropdown extends PureComponent<DropdownProps, DropdownState> {
  static List: typeof List = List;

  static Item: typeof Item = Item;

  static SubList: typeof SubList = SubList;

  static defaultProps = {
    placement: 'bottomLeft',
  };

  childrenDOM?: HTMLElement;

  listRef?: HTMLElement;

  rectObserver?: any;

  state = {
    visible: false,
    rect: {},
  };

  componentDidMount() {
    this.childrenDOM = findDOMNode(this) as HTMLElement;

    this.rectObserver = observeRect(this.childrenDOM, (rect: DOMRect) => {
      this.setState({ rect });
    });

    // Get the width & height of children component
    this.rectObserver.observe();
    this.rectObserver.unobserve();
  }

  // componentDidUpdate(prevProps: DropdownProps, prevState: DropdownState) {
  //   console.log('update', this.state.rect.top);
  //   if (
  //     prevState.visible &&
  //     this.state.visible &&
  //     ((prevState.rect as DOMRect).top !== (this.state.rect as DOMRect).top ||
  //       (prevState.rect as DOMRect).left !== (this.state.rect as DOMRect).left)
  //   ) {
  //     this.handleClose();
  //   }
  // }

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

  handleListRef = (ref: any) => {
    this.listRef = ref;
  };

  getOffset = () => {
    const { rect } = this.state;

    const MARGIN_OFFSET = 5;

    const offsetHeight = this.listRef ? this.listRef.offsetHeight : 0;
    const offsetWidth = this.listRef ? this.listRef.offsetWidth : 0;

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

    const offset = this.getOffset();

    const translateFrom = placement.startsWith('top') ? 10 : -10;

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
