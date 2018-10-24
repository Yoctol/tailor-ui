import BaseSelect, { components } from 'react-select';
import React, { SFC } from 'react';

import styled from 'utils/styled-components';
import { styledCss } from 'utils/css';

const StyledSelect = styled<any, any>(BaseSelect)`
  & .yoctol-select__control {
    min-width: 150px;
    border-color: ${p => p.theme.colors.gray300};
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
            ${p => p.theme.colors.gray300};
        }
        background-color: ${p => p.theme.colors.light};
        color: ${p => p.theme.colors.gray700};

        &.yoctol-select__option--is-focused {
          background-color: ${p => p.theme.colors.primaryDark};
          color: ${p => p.theme.colors.light};
        }
      }
    }
  }

  ${styledCss};
`;

export interface ISelectProps {
  /**
   * delimiter string for multi-select value in text style mode
   */
  delimiter?: string;
  /**
   * Is the select value clearable
   */
  isClearable?: boolean;
  /**
   * Disable the control
   */
  isDisabled?: boolean;
  /**
   * Allow user to select multiple options
   */
  isMulti?: boolean;
  /**
   * Allow the user to search for matching options
   */
  isSearchable?: boolean;
  /**
   * Choose tag or text style in multi-select (options: "tag", "text")
   */
  multiSelectMode?: string;
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
  value?: number | string | object | object[];
  /**
   * Subscribe to change events
   */
  onChange?: (option: number | string | object) => void;
}

const Select: SFC<ISelectProps> = props => {
  const { isMulti, delimiter, multiSelectMode } = props;
  if (isMulti) {
    if (multiSelectMode === 'text') {
      const Option = (_props: any) => (
        <components.Option {..._props} isFocused={_props.isSelected} />
      );
      const MultiValue = (_props: any) => {
        const {
          selectProps: {
            value: [{ value: firstValue }],
          },
          data: { value: dataValue, label: dataLabel },
        } = _props;
        return `${firstValue !== dataValue ? delimiter : ''}${dataLabel}`;
      };
      return (
        <StyledSelect
          classNamePrefix="yoctol-select"
          {...props}
          components={{ Option, MultiValue }}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
        />
      );
    }
  }
  return <StyledSelect classNamePrefix="yoctol-select" {...props} />;
};

Select.defaultProps = {
  delimiter: ',',
  isClearable: false,
  isDisabled: false,
  isMulti: false,
  isSearchable: false,
  multiSelectMode: 'tag',
  placeholder: '',
};

export default Select;
