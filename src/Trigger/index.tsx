import React, { PureComponent, ReactNode } from 'react';
import observeRect from '@reach/observe-rect';
import { Transition, config } from 'react-spring';
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
  visible: boolean;
}

export interface ITriggerProps {
  /**
   * The component which this Trigger show up
   */
  children: (renderProps: IChildrenRenderProps) => ReactNode;
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
}

interface ITriggerState {
  visible: boolean;
  rect?: DOMRect;
  popupRef?: HTMLElement;
}

class Trigger extends PureComponent<ITriggerProps, ITriggerState> {
  static defaultProps = {
    placement: 'bottomLeft',
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
    const { children } = this.props;
    const { visible } = this.state;

    return children({
      toggle: this.toggle,
      visible,
    });
  };

  renderPopup = () => {
    const { popup, placement } = this.props;
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
          (styles => (
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
