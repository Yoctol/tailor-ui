import React, {
  PureComponent,
  ReactElement,
  ReactNode,
  Ref,
  cloneElement,
} from 'react';
import observeRect from '@reach/observe-rect';
import { Transition, config } from 'react-spring';
import { composeEvents } from 'react-powerplug';
import { findDOMNode } from 'react-dom';

import ClickOutside from '../utils/ClickOutside';
import Keydown from '../utils/Keydown';
import Portal from '../utils/Portal';

import getPositionOffset, { Placement } from './getPositionOffset';

export interface IPopupRenderProps {
  styles: {
    top: number;
    left: number;
    [key: string]: any;
  };
  handleClose: () => void;
  handlePopupRef: Ref<any>;
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

  handlePopupRef = (popupRef: any) => {
    const popupElement = findDOMNode(popupRef);

    if (popupElement instanceof HTMLElement) {
      this.setState(() => ({
        popupRef: popupElement,
      }));
    }
  };

  getTransitions = () => {
    const { placement, animation } = this.props;

    let transform = {
      enter: 'scale(1)',
      leave: 'scale(0.3)',
    };

    let transformOrigin = 'initial';

    if (animation === 'slide') {
      const translateFrom = placement.startsWith('top') ? 10 : -10;
      transform = {
        leave: 'translate3d(0, 0px, 0)',
        enter:
          placement.startsWith('top') || placement.startsWith('bottom')
            ? `translate3d(0, ${translateFrom}px, 0)`
            : `translate3d(${translateFrom}px, 0, 0)`,
      };
    } else if (animation === 'scale') {
      transformOrigin = {
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
    }

    return {
      from: {
        opacity: 0,
        transform: transform.leave,
        transformOrigin,
      },
      enter: {
        opacity: 1,
        transform: transform.enter,
        transformOrigin,
      },
      leave: {
        opacity: 0,
        transform: transform.leave,
        transformOrigin,
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
        items={visible ? 'visible' : 'hidden'}
        {...this.getTransitions()}
        config={{
          ...config.stiff,
          precision: 0.1,
        }}
      >
        {v =>
          v === 'visible' && // FIXME: waiting for the typing update
          ((styles: any) => {
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
          })
        }
      </Transition>
    );
  };

  render() {
    const { visible } = this.state;
    const { trigger, appendFor } = this.props;

    return (
      <>
        {this.renderChildren()}
        {visible &&
          trigger === 'click' && (
            <Keydown
              keyCode={Keydown.ESC_KEY_CODE}
              handleKeydown={this.handleClose}
            />
          )}
        <Portal appendFor={appendFor}>{this.renderPopup()}</Portal>
      </>
    );
  }
}

export default Trigger;
