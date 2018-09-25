import React, { PureComponent } from 'react';
import {
  MinWidthProps,
  TextAlignProps,
  minWidth,
  textAlign,
} from 'styled-system';
import { animated } from 'react-spring';

import styled from 'utils/styled-components';

import { Consumer, Placement } from './DropdownContext';

export type StyledListProps = MinWidthProps &
  TextAlignProps & {
    placement?: Placement;
    offset?: {
      top: number;
      left: number;
    };
  };

export const StyledList = styled<StyledListProps, 'ul'>('ul')`
  display: block;
  position: absolute;
  z-index: 9999;
  top: ${p => (p.offset ? p.offset.top : 0)}px;
  left: ${p => (p.offset ? p.offset.left : 0)}px;
  margin: 0;
  padding: ${p => p.theme.space[1]} 0;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray[8]};
  background-color: ${p => p.theme.colors.light};
  box-shadow: ${p => p.theme.shadows[1]};
  list-style: none;

  &:focus {
    outline: 0;
  }

  ${minWidth};
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
        {({ placement, offset, styles, onClick, handleListRef }) => (
          <AnimatedStyledList
            innerRef={handleListRef}
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

export default List;
