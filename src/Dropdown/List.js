import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { minWidth, space, textAlign } from 'styled-system';

import { Consumer } from './DropdownContext';

const StyledList = styled.ul`
  display: block;
  position: absolute;
  z-index: 99;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: ${p => p.theme.borders.default};
  border-radius: ${p => p.theme.radii[2]};
  border-color: ${p => p.theme.colors.gray[8]};
  background-color: transparent;
  box-shadow: 0 2px 6px 0 rgba(191, 191, 191, 0.5);
  list-style: none;

  ${({ placement, offset }) => {
    switch (placement) {
      case 'bottomLeft':
        return css`
          top: ${offset}px;
          right: 0;
        `;
      case 'bottomRight':
        return css`
          top: ${offset}px;
          left: 0;
        `;
      case 'topLeft':
        return css`
          right: 0;
          bottom: ${offset}px;
        `;
      case 'topRight':
        return css`
          bottom: ${offset}px;
          left: 0;
        `;
      default:
        return null;
    }
  }} &:focus {
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

export default List;
