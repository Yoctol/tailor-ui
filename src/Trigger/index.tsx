import React, {
  PureComponent,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react';
import observeRect from '@reach/observe-rect';
import { Transition, config } from 'react-spring';
import { composeEvents } from 'react-powerplug';
import { findDOMNode } from 'react-dom';

import ClickOutside from '../utils/ClickOutside';
import Portal from '../utils/Portal';

import getPositionOffset, { Placement } from './getPositionOffset';

export interface IPopupRenderProps {
  offset: {
    top: number;
    left: number;
  };
  styles: any;
  handleClose: () => void;
  handlePopupRef: (ref: HTMLElement) => void;
}

export interface IChildrenRenderProps {
  toggle: () => void;
  bind:
    | {}
    | {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
      };
  visible: boolean;
}

export interface ITriggerProps {
  /**
   * The component which this Trigger show up
   */
  children:
    | ReactElement<any>
    | ((renderProps: IChildrenRenderProps) => ReactNode);
  /**
   * The content in this Trigger component
   */
  popup: (renderProps: IPopupRenderProps) => ReactNode;
  /**
   * The position base on the children component
   */
  placement: Placement;

  /**
   * a callback function takes an argument: visible, is executed when the visible state is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  trigger?: 'hover' | 'click';
}

interface ITriggerState {
  visible: boolean;
  rect?: DOMRect;
  popupRef?: HTMLElement;
}

class Trigger extends PureComponent<ITriggerProps, ITriggerState> {
  static defaultProps = {
    placement: 'bottomLeft',
    trigger: 'hover',
  };

  childrenDOM?: HTMLElement;

  rectObserver?: any;

  offset: {
    top: number;
    left: number;
  } = {
    top: 0,
    left: 0,
  };

  state = {
    visible: false,
    popupRef: undefined,
    rect: undefined,
  };

  componentDidMount() {
    this.childrenDOM = findDOMNode(this) as HTMLElement;

    this.rectObserver = observeRect(this.childrenDOM, (rect: DOMRect) => {
      this.setState({ rect });
    });
  }

  toggle = () => {
    const { visible } = this.state;

    if (!visible) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  };

  handleOpen = () => {
    const { visible } = this.state;

    if (!visible) {
      const { onVisibleChange } = this.props;

      this.rectObserver.observe();
      this.setState(() => ({ visible: true }));

      if (onVisibleChange) {
        onVisibleChange(true);
      }
    }
  };

  handleClose = () => {
    const { visible } = this.state;

    if (visible) {
      const { onVisibleChange } = this.props;

      this.setState(() => ({ visible: false }));
      this.rectObserver.unobserve();

      if (onVisibleChange) {
        onVisibleChange(false);
      }
    }
  };

  handlePopupRef = (popupRef: HTMLElement) => {
    this.setState(() => ({ popupRef }));
  };

  getTransform = () => {
    const { placement } = this.props;
    const translateFrom = placement.startsWith('top') ? 10 : -10;

    return `translate3d(0, ${translateFrom}px, 0)`;
  };

  renderChildren = () => {
    const { children, trigger } = this.props;
    const { visible } = this.state;

    if (children instanceof Function) {
      return children({
        toggle: this.toggle,
        bind:
          trigger === 'hover'
            ? {
                onMouseEnter: this.handleOpen,
                onMouseLeave: this.handleClose,
              }
            : {},
        visible,
      });
    }

    return cloneElement(
      children,
      composeEvents(children.props, {
        onClick: this.toggle,
        onMouseEnter: this.handleOpen,
        onMouseLeave: this.handleClose,
      })
    );
  };

  renderPopup = () => {
    const { popup, placement, trigger } = this.props;
    const { visible, popupRef, rect } = this.state;

    if (!this.childrenDOM || this.childrenDOM instanceof Text) {
      return null;
    }

    if (visible && popupRef && rect) {
      this.offset = getPositionOffset(rect, popupRef, placement);
    }

    const transform = this.getTransform();

    return (
      <Transition
        native
        keys={visible ? 'visible' : 'hidden'}
        from={{
          opacity: 0,
          transform,
        }}
        enter={{
          opacity: 1,
          transform: `translate3d(0, 0px, 0)`,
        }}
        leave={{
          opacity: 0,
          transform,
        }}
        config={{
          ...config.stiff,
          restSpeedThreshold: 1,
          restDisplacementThreshold: 0.1,
        }}
      >
        {visible &&
          (styles =>
            trigger === 'click' ? (
              <ClickOutside
                bindRefs={[this.childrenDOM, popupRef]}
                onClickOutside={this.handleClose}
              >
                {popup({
                  styles,
                  offset: this.offset,
                  handleClose: this.handleClose,
                  handlePopupRef: this.handlePopupRef,
                })}
              </ClickOutside>
            ) : (
              popup({
                styles,
                offset: this.offset,
                handleClose: this.handleClose,
                handlePopupRef: this.handlePopupRef,
              })
            ))}
      </Transition>
    );
  };

  render() {
    return (
      <>
        {this.renderChildren()}
        <Portal>{this.renderPopup()}</Portal>
      </>
    );
  }
}

export default Trigger;
