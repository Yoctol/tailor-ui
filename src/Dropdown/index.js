import PropTypes from 'prop-types';
import React, { PureComponent, createContext } from 'react';
import styled, { css } from 'styled-components';
import { Transition, animated } from 'react-spring';
import { minWidth, space, textAlign, themeGet } from 'styled-system';
import { prop, switchProp } from 'styled-tools';

import ClickOutside from '../utils/ClickOutside';

const { Provider, Consumer } = createContext();

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

const StyledList = styled.ul`
  display: block;
  position: absolute;
  z-index: 99;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: ${themeGet('borders.default')};
  border-radius: ${themeGet('radii.2')};
  border-color: ${p => p.theme.colors.gray[8]};
  background-color: transparent;
  box-shadow: 0 2px 6px 0 rgba(191, 191, 191, 0.5);
  list-style: none;

  ${switchProp('placement', {
    bottomLeft: css`
      top: ${prop('offset')}px;
      right: 0;
    `,
    bottomRight: css`
      top: ${prop('offset')}px;
      left: 0;
    `,
    topLeft: css`
      right: 0;
      bottom: ${prop('offset')}px;
    `,
    topRight: css`
      bottom: ${prop('offset')}px;
      left: 0;
    `,
  })};

  &:focus {
    outline: 0;
  }

  ${space};
  ${minWidth};
  ${textAlign};
`;

StyledList.propTypes = {
  ...space.propTypes,
  ...textAlign.propTypes,
  ...minWidth.propTypes,
};

StyledList.defaultProps = {
  py: 2,
  textAlign: 'center',
  minWidth: 100,
};

const AnimatedStyledList = animated(StyledList);

// eslint-disable-next-line react/no-multi-comp
class List extends PureComponent {
  render() {
    const { children, style, ...props } = this.props;
    return (
      <Consumer>
        {({ placement, offset, styles, onClick }) => (
          <AnimatedStyledList
            placement={placement}
            offset={offset}
            style={{ ...style, ...styles }}
            onClick={onClick}
            {...props}
          >
            {children}
          </AnimatedStyledList>
        )}
      </Consumer>
    );
  }
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

List.defaultProps = {
  style: {},
};

List.displayName = 'Dropdown.List';

Dropdown.List = List;

const Item = styled.li`
  margin-top: 0;
  padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
  background-color: ${themeGet('colors.light')};
  color: ${themeGet('colors.gray.4')};
  font-size: ${themeGet('fontSizes.default')};
  cursor: pointer;

  &:hover {
    background-color: ${themeGet('colors.gray.8')};
  }

  ${p => p.theme.transition /* sc-declaration */};
  ${space};
`;

Item.displayName = 'Dropdown.Item';
Item.propTypes = {
  ...space.propTypes,
};

Dropdown.Item = Item;

export default Dropdown;
