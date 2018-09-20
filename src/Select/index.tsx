import BaseSelect from 'react-select';
import React, { SFC } from 'react';

import styled from 'utils/styled-components';

const StyledSelect = styled<any, any>(BaseSelect)`
  & .yoctol-select__control {
    min-width: 150px;
    border-color: ${p => p.theme.colors.gray[8]};
    background-color: ${p => p.theme.colors.light};
    box-shadow: none;

    &:hover {
      border-color: ${p => p.theme.colors.primary};
    }

    &.yoctol-select__control--is-focused {
      border-color: ${p => p.theme.colors.primaryDark};
    }

    &.yoctol-select__control-is-disabled {
      & .yoctol-select__indicators {
        &::before {
          opacity: 0.5;
        }
      }
    }
  }

  & .yoctol-select__menu {
    margin-top: 2px;

    .yoctol-select__menu-list {
      padding-top: 0;
      padding-bottom: 0;

      .yoctol-select__option {
        &:not(:last-child) {
          border-bottom: ${p => p.theme.borders.base}
            ${p => p.theme.colors.gray[8]};
        }
        background-color: ${p => p.theme.colors.light};
        color: ${p => p.theme.colors.gray[2]};

        &.yoctol-select__option--is-focused {
          background-color: ${p => p.theme.colors.primaryDark};
          color: ${p => p.theme.colors.light};
        }
      }
    }
  }
`;

export interface SelectProps {
  /**
   * Is the select value clearable
   */
  isClearable?: boolean;
  /**
   * Disable the control
   */
  isDisabled?: boolean;
  /**
   * Allow the user to search for matching options
   */
  isSearchable?: boolean;
  /**
   * Specify the options the user can select from
   */
  options?: number[] | string[] | object[];
  /**
   * Change the text displayed when no option is selected
   */
  placeholder?: string;
  /**
   * One of options
   */
  value?: number | string | object;
  /**
   * Subscribe to change events
   */
  onChange?: (option: number | string | object) => void;
}

const Select: SFC<SelectProps> = props => (
  <StyledSelect classNamePrefix="yoctol-select" {...props} />
);

export default Select;
