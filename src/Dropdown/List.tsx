import React, { PureComponent } from 'react';
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
import { animated } from 'react-spring';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

import { Consumer } from './DropdownContext';

export type StyledListProps = MinWidthProps &
  MaxHeightProps &
  TextAlignProps &
  OverflowProps;

export const StyledList = styled<StyledListProps, 'ul'>(tag.ul)`
  display: block;
  position: absolute;
  z-index: 9999;
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
