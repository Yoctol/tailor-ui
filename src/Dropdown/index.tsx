import React, { PureComponent, ReactNode } from 'react';
import { Transition, config } from 'react-spring';

import ClickOutside from '../utils/ClickOutside';

import Item from './Item';
import List from './List';
import SubList from './SubList';
import { Provider, Placement } from './DropdownContext';

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
  display: string;
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
  onVisibleChange: (visible: boolean) => void;
}

class Dropdown extends PureComponent<DropdownProps> {
  static List = List;
  static Item = Item;
  static SubList = SubList;

  state = {
    visible: false,
  };

  wrapperRef?: {
    children: HTMLCollectionOf<HTMLDivElement>;
  };

  getOffset = () => {
    if (this.wrapperRef) {
      const { offsetHeight } = this.wrapperRef.children[0];
      const DROPDOWN_MARGIN = 3;
      return offsetHeight + DROPDOWN_MARGIN;
    }

    return 0;
  };

  toggle = () => {
    const { visible } = this.state;
    const { onVisibleChange } = this.props;

    this.setState(() => ({
      visible: !visible,
    }));

    if (onVisibleChange) onVisibleChange(!visible);
  };

  close = () => {
    const { onVisibleChange } = this.props;

    this.setState(() => ({ visible: false }));

    if (onVisibleChange) onVisibleChange(false);
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

    const translateFrom = placement.startsWith('top') ? 10 : -10;
    let offset = 0;

    if (visible) {
      offset = this.getOffset();
    }

    return (
      <Transition
        native
        from={{ opacity: 0, transform: `translateY(${translateFrom}px)` }}
        enter={{ opacity: 1, transform: 'translateY(0)' }}
        leave={{
          opacity: 0,
          transform: `translateY(${translateFrom}px)`,
          pointerEvents: 'none',
        }}
        config={config.stiff}
      >
        {visible &&
          (styles => (
            <Provider
              value={{
                placement,
                offset,
                styles,
                onClick: this.close,
              }}
            >
              {overlay}
            </Provider>
          ))}
      </Transition>
    );
  };

  render() {
    const { display = 'inline-block' } = this.props;

    return (
      <ClickOutside onClickOutside={this.close}>
        {({ bindRef }) => (
          <div
            ref={(wrapperRef: any) => {
              if (wrapperRef) {
                this.wrapperRef = wrapperRef;
                bindRef(wrapperRef);
              }
            }}
            style={{ display, position: 'relative' }}
          >
            {this.renderChildren()}
            {this.renderOverlay()}
          </div>
        )}
      </ClickOutside>
    );
  }
}

export default Dropdown;
