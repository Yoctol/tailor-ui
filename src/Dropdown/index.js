import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Transition, animated } from 'react-spring';
import { themeGet, space, textAlign, minWidth } from 'styled-system';
import { switchProp, prop } from 'styled-tools';

import ClickOutside from '../utils/ClickOutside';
import { shadowVariant } from '../utils/shadow';
import controlTransition from '../utils/transition';

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
    this.setState(({ visible }) => ({
      visible: !visible,
    }));
  };

  close = () => {
    this.setState(() => ({ visible: false }));
  };

  renderChildren = () => {
    const { children } = this.props;
    return cloneElement(children, {
      onClick: event => {
        this.toggle();
        if (children.props.onClick) {
          children.props.onClick(event);
        }
      },
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
          (styles =>
            cloneElement(overlay, {
              placement,
              offset,
              style: { ...overlay.style, ...styles },
              onClick: this.close,
            }))}
      </Transition>
    );
  };

  render() {
    return (
      <ClickOutside onClickOutside={this.close}>
        {({ bind }) => (
          <div
            ref={wrapperRef => {
              this.wrapperRef = wrapperRef;
              bind.ref(wrapperRef);
            }}
            style={{ display: 'inline-block', position: 'relative' }}
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
  children: PropTypes.node.isRequired,
  overlay: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    'topRight',
    'topLeft',
    'bottomRight',
    'bottomLeft',
  ]),
};

Dropdown.defaultProps = {
  placement: 'bottomLeft',
};

const List = styled.ul`
  display: block;
  position: absolute;
  z-index: 99;
  margin: 0;
  padding: 0;
  background-color: transparent;
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

  ${shadowVariant(0.1)};
  ${minWidth};
  ${textAlign};
`;

List.propTypes = {
  ...textAlign.propTypes,
  ...minWidth.propTypes,
};

List.defaultProps = {
  textAlign: 'center',
  minWidth: 100,
};

const AnimatedDropdownList = animated(List);
AnimatedDropdownList.displayName = 'Dropdown.List';

Dropdown.List = AnimatedDropdownList;

const Item = styled.li`
  margin-top: 0;
  padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
  background-color: ${themeGet('colors.light')};
  color: ${themeGet('colors.gray.4')};
  font-size: ${themeGet('fontSizes.default')};
  cursor: pointer;

  &:hover {
    background-color: ${themeGet('colors.primaryDark')};
    color: ${themeGet('colors.light')};
  }

  &:not(:first-child) {
    border-top: 0;
  }

  ${controlTransition()};
  ${space};
`;

Item.displayName = 'Dropdown.Item';
Item.propTypes = {
  ...space.propTypes,
};

Dropdown.Item = Item;

export default Dropdown;
