import React, {
  PureComponent,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react';
import observeRect from '@reach/observe-rect';
import { Transition, config } from 'react-spring';
import { findDOMNode } from 'react-dom';

import ClickOutside from '../utils/ClickOutside';
import Portal from '../utils/Portal';

import getPositionOffset, { Placement } from './getPositionOffset';
import getTransitionStyles from './getTransitionStyles';

export interface IPopupRenderProps {
  styles: {
    top: number;
    left: number;
    [key: string]: any;
  };
  handleClose: () => void;
  handlePopupRef: any;
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
    window.addEventListener('keydown', this.handleKeydown);

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
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = ({ keyCode }: KeyboardEvent) => {
    const { visible } = this.state;
    const { trigger } = this.props;

    if (visible && trigger === 'click' && keyCode === 27) {
      this.handleClose();
    }
  };

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

  renderChildren = () => {
    const { children, trigger } = this.props;
    const { visible } = this.state;

    let bind = {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    };
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

    return cloneElement(children, {
      ...children.props,
      onClick: (event: MouseEvent) => {
        toggle();
        if (children.props.onClick) {
          children.props.onClick(event);
        }
      },
      onMouseEnter: (event: MouseEvent) => {
        bind.onMouseEnter();
        if (children.props.onMouseEnter) {
          children.props.onMouseEnter(event);
        }
      },
      onMouseLeave: (event: MouseEvent) => {
        bind.onMouseLeave();
        if (children.props.onMouseLeave) {
          children.props.onMouseLeave(event);
        }
      },
    });
  };

  renderPopup = () => {
    const { popup, placement, trigger, offset, animation } = this.props;
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
        {...getTransitionStyles({ animation, placement })}
        config={{
          ...config.stiff,
          precision: 0.1,
        }}
      >
        {v =>
          v === 'visible' // FIXME: waiting for the typing update
            ? (styles: any) => {
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
              }
            : () => null
        }
      </Transition>
    );
  };

  render() {
    const { appendFor } = this.props;

    return (
      <>
        {this.renderChildren()}
        <Portal appendFor={appendFor}>{this.renderPopup()}</Portal>
      </>
    );
  }
}

export default Trigger;
