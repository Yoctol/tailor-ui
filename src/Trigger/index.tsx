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
  styles: {
    top: number;
    left: number;
    [key: string]: any;
  };
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
  animation: 'slide' | 'scale';
  appendFor?: string;
  offset?: number;
  defaultVisible?: boolean;
}

interface ITriggerState {
  visible: boolean;
  rect: DOMRect | null;
  popupRef?: HTMLElement;
}

class Trigger extends PureComponent<ITriggerProps, ITriggerState> {
  static defaultProps = {
    placement: 'bottomLeft',
    trigger: 'hover',
    animation: 'slide',
    defaultVisible: false,
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
    visible: this.props.defaultVisible || false,
    popupRef: undefined,
    rect: null,
  };

  componentDidMount() {
    this.childrenDOM = findDOMNode(this) as HTMLElement;

    this.rectObserver = observeRect(this.childrenDOM, (rect: DOMRect) => {
      this.setState({ rect });
    });

    if (this.props.defaultVisible) {
      this.rectObserver.observe();
    }
  }

  componentWillUnmount() {
    this.rectObserver.unobserve();
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

      this.setState(() => ({ visible: false, rect: null }));
      this.rectObserver.unobserve();

      if (onVisibleChange) {
        onVisibleChange(false);
      }
    }
  };

  handlePopupRef = (popupRef: HTMLElement) => {
    this.setState(() => ({ popupRef }));
  };

  getTransitions = () => {
    const { placement, animation } = this.props;

    if (animation === 'slide') {
      const translateFrom = placement.startsWith('top') ? 10 : -10;
      const transform =
        placement.startsWith('top') || placement.startsWith('bottom')
          ? `translate3d(0, ${translateFrom}px, 0)`
          : `translate3d(${translateFrom}px, 0, 0)`;

      return {
        from: {
          opacity: 0,
          transform,
        },
        enter: {
          opacity: 1,
          transform: `translate3d(0, 0px, 0)`,
        },
        leave: {
          opacity: 0,
          transform,
        },
      };
    }

    const transformOrigin = {
      topLeft: 'left bottom',
      top: '50% bottom',
      topRight: 'right bottom',
      bottomLeft: 'left top',
      bottom: '50% top',
      bottomRight: 'right top',
      leftTop: 'right top',
      left: 'right 50%',
      leftBottom: 'right bottom',
      rightTop: 'left top',
      right: 'left 50%',
      rightBottom: 'left bottom',
    }[placement];

    return {
      from: {
        opacity: 0,
        transformOrigin,
        transform: `scale(0.3)`,
      },
      enter: {
        opacity: 1,
        transformOrigin,
        transform: `scale(1)`,
      },
      leave: {
        opacity: 0,
        transformOrigin,
        transform: `scale(0.3)`,
      },
    };
  };

  renderChildren = () => {
    const { children, trigger } = this.props;
    const { visible } = this.state;

    let bind = {};
    let toggle = () => {};

    if (trigger === 'hover') {
      bind = {
        onMouseEnter: this.handleOpen,
        onMouseLeave: this.handleClose,
      };
    }

    if (trigger === 'click') {
      toggle = this.toggle;
    }

    if (children instanceof Function) {
      return children({
        toggle,
        bind,
        visible,
      });
    }

    return cloneElement(
      children,
      composeEvents(children.props, {
        onClick: toggle,
        ...bind,
      })
    );
  };

  renderPopup = () => {
    const { popup, placement, trigger, offset } = this.props;
    const { visible, popupRef, rect } = this.state;

    if (!this.childrenDOM || this.childrenDOM instanceof Text) {
      return null;
    }

    if (visible && popupRef && rect) {
      this.offset = getPositionOffset(rect, popupRef, placement, offset);
    }

    return (
      <Transition
        native
        keys={visible ? 'visible' : 'hidden'}
        {...this.getTransitions()}
        config={{
          ...config.stiff,
          restSpeedThreshold: 1,
          restDisplacementThreshold: 0.1,
        }}
      >
        {visible &&
          (styles => {
            const renderPopup = () =>
              popup({
                styles: {
                  ...styles,
                  ...this.offset,
                },
                handleClose: this.handleClose,
                handlePopupRef: this.handlePopupRef,
              });

            return trigger === 'click' ? (
              <ClickOutside
                bindRefs={[this.childrenDOM, popupRef]}
                onClickOutside={this.handleClose}
              >
                {renderPopup()}
              </ClickOutside>
            ) : (
              renderPopup()
            );
          })}
      </Transition>
    );
  };

  render() {
    return (
      <>
        {this.renderChildren()}
        <Portal appendFor={this.props.appendFor}>{this.renderPopup()}</Portal>
      </>
    );
  }
}

export default Trigger;