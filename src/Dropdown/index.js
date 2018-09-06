import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Transition } from 'react-spring';

import ClickOutside from '../utils/ClickOutside';

import Item from './Item';
import List from './List';
import { Provider } from './DropdownContext';

class Dropdown extends PureComponent {
  state = {
    visible: false,
  };

  getOffset = () => {
    const { offsetHeight } = this.wrapperRef.children[0];
    const DROPDOWN_MARGIN = 3;
    return offsetHeight + DROPDOWN_MARGIN;
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
    const { overlay, placement } = this.props;
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
    const { display } = this.props;
    return (
      <ClickOutside onClickOutside={this.close}>
        {({ bind }) => (
          <div
            ref={wrapperRef => {
              this.wrapperRef = wrapperRef;
              bind.ref(wrapperRef);
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

Dropdown.propTypes = {
  /**
   * The component which this dropdown show up
   */
  children: PropTypes.func.isRequired,
  /**
   * The wrapper component's display style
   */
  display: PropTypes.string,
  /**
   * The content in this dropdown component
   */
  overlay: PropTypes.node.isRequired,
  /**
   * The position base on the children component
   */
  placement: PropTypes.oneOf([
    'topRight',
    'topLeft',
    'bottomRight',
    'bottomLeft',
  ]),
  /**
   * a callback function takes an argument: visible, is executed when the visible state is changed
   */
  onVisibleChange: PropTypes.func,
};

Dropdown.defaultProps = {
  placement: 'bottomLeft',
  display: 'inline-block',
  onVisibleChange: null,
};

Dropdown.List = List;
Dropdown.Item = Item;

export default Dropdown;
