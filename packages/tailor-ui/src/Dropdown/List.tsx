import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  MaxHeightProps,
  MinWidthProps,
  OverflowProps,
  TextAlignProps,
  maxHeight,
  minWidth,
  overflow,
  textAlign,
} from 'styled-system';
import { animated } from 'react-spring/renderprops.cjs';

import { Consumer } from './DropdownContext';

export type StyledListProps = MinWidthProps &
  MaxHeightProps &
  TextAlignProps &
  OverflowProps;

export const StyledList = styled.ul<StyledListProps>`
  display: block;
  margin: 0;
  padding: ${p => p.theme.space[1]} 0;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray300};
  background-color: ${p => p.theme.colors.light};
  box-shadow: ${p => p.theme.shadows.lg};
  list-style: none;

  &:focus {
    outline: 0;
  }

  ${overflow};
  ${minWidth};
  ${maxHeight};
  ${textAlign};
`;

const AnimatedStyledList = animated(StyledList);

export type ListProps = MinWidthProps &
  TextAlignProps & {
    style?: any;
  };

class List extends PureComponent<ListProps> {
  static defaultProps = {
    textAlign: 'left',
    minWidth: 100,
  };

  render() {
    const { children, style, ...props } = this.props;
    return (
      <Consumer>
        {({ styles, handleListRef }) => (
          <AnimatedStyledList
            data-testid="dropdown-overlay"
            ref={handleListRef}
            style={{
              ...style,
              ...styles,
            }}
            {...props}
          >
            {children}
          </AnimatedStyledList>
        )}
      </Consumer>
    );
  }
}

export default List;
