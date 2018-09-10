import BaseSelect, { components } from 'react-select';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

const StyledSelect = styled(BaseSelect).attrs({
  classNamePrefix: 'yoctol-select',
})`
  & .yoctol-select__control {
    min-width: 150px;
    border-color: ${themeGet('colors.gray.8')};
    background-color: ${themeGet('colors.light')};
    box-shadow: none;

    &:hover {
      border-color: ${themeGet('colors.primary')};
    }

    &.yoctol-select__control--is-focused {
      border-color: ${themeGet('colors.primaryDark')};
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
          border-bottom: ${themeGet('borders.default')}
            ${themeGet('colors.gray.8')};
        }
        background-color: ${themeGet('colors.light')};
        color: ${themeGet('colors.gray.2')};

        &.yoctol-select__option--is-focused {
          background-color: ${themeGet('colors.primaryDark')};
          color: ${themeGet('colors.light')};
        }
      }
    }
  }
`;

const Select = props => {
  if (props.isMulti) {
    const Option = _props => (
      <components.Option {..._props} isFocused={_props.isSelected} />
    );
    const MultiValue = _props => _props.data.label;
    return (
      <StyledSelect
        {...props}
        components={{ Option, MultiValue }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
    );
  }
  return <StyledSelect {...props} />;
};

Select.propTypes = {
  /**
   * Is the select value clearable
   */
  isClearable: PropTypes.bool,
  /**
   * Disable the control
   */
  isDisabled: PropTypes.bool,
  /**
   * Allow user to select multiple options
   */
  isMulti: PropTypes.bool,
  /**
   * Allow the user to search for matching options
   */
  isSearchable: PropTypes.bool,
  /**
   * Specify the options the user can select from
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
      .isRequired
  ).isRequired,
  /**
   * Change the text displayed when no option is selected
   */
  placeholder: PropTypes.string,
  /**
   * One of options
   */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  /**
   * Subscribe to change events
   */
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  isClearable: false,
  isDisabled: false,
  isMulti: false,
  isSearchable: false,
  placeholder: '',
};

Select.components = components;

export default Select;
