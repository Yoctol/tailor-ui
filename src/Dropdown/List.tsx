import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  MinWidthProps,
  SpaceProps,
  TextAlignProps,
  minWidth,
  space,
  textAlign,
} from 'styled-system';
import { animated } from 'react-spring';

import { Consumer, Placement } from './DropdownContext';

export type StyledListProps = MinWidthProps &
  TextAlignProps &
  SpaceProps & {
    placement?: Placement;
    offset?: number;
  };

export const StyledList = styled<StyledListProps, 'ul'>('ul')`
  display: block;
  position: absolute;
  z-index: 99;
  margin: 0;
  padding: 0;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.lg};
  border-color: ${p => p.theme.colors.gray[8]};
  background-color: ${p => p.theme.colors.light};
  box-shadow: 0 2px 6px 0 rgba(191, 191, 191, 0.5);
  list-style: none;

  &:focus {
    outline: 0;
  }

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
  }};

  ${space};
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
        {({ placement, offset, styles, onClick }) => (
          <AnimatedStyledList
            placement={placement}
            offset={offset}
            style={{ ...style, ...styles }}
            onClick={onClick}
            py="2"
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
