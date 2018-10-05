import React, { MouseEventHandler, SFC, forwardRef } from 'react';
import { SpaceProps, space } from 'styled-system';

import styled, { css } from 'utils/styled-components';

import { Consumer } from './DropdownContext';

type StyledItemProps = SpaceProps & { disabled?: boolean };

const StyledListItem = styled<StyledItemProps, 'li'>('li')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${p => p.theme.heights.base};
  margin-top: 0;
  padding: 0 ${p => p.theme.paddings.md};
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray600};
  font-size: ${p => p.theme.fontSizes.base};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.gray300};
  }

  ${p =>
    p.disabled &&
    css`
      background-color: ${p.theme.colors.gray300};
      color: ${p.theme.colors.gray500};
      cursor: not-allowed;
    `};

  ${p => p.theme.transition /* sc-declaration */};
  ${space};
`;

export interface ItemProps {
  /**
   * Disabled the item
   */
  disabled?: boolean;
  /**
   * Callback for click
   */
  onClick?: MouseEventHandler;
  /**
   * Keep the dropdown after click item
   */
  keep?: boolean;
}

const Item: SFC<ItemProps> = ({ onClick, disabled, keep, ...props }, ref) => (
  <Consumer>
    {({ handleClose }) => (
      <StyledListItem
        innerRef={ref}
        onClick={event => {
          if (disabled) {
            return;
          }
          if (onClick) {
            onClick(event);
          }
          if (!keep) {
            handleClose();
          }
        }}
        disabled={disabled}
        {...props}
      />
    )}
  </Consumer>
);

export default forwardRef(Item);
