import BaseSelect from 'react-select';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import controlTransition from '../utils/transition';
import { controlShadow } from '../utils/shadow';

const StyledSelect = styled(BaseSelect).attrs({
  classNamePrefix: 'yoctol-select',
})`
  & .yoctol-select__control {
    min-width: 150px;
    border-color: ${themeGet('colors.gray.8')};
    background-color: ${themeGet('colors.light')};

    &:hover {
      border-color: ${themeGet('colors.gray.4')};
    }

    .yoctol-select__value-container {
      /* empty */
    }

    & .yoctol-select__indicators {
      .yoctol-select__indicator-separator {
        display: none;
      }

      .yoctol-select__indicator {
        ${controlTransition()};

        &.yoctol-select__dropdown-indicator {
          content: '';
          position: relative;
          width: 0;
          height: 0;
          margin-right: 13px;
          margin-left: 5px;
          padding: 0;
          border-top: 6px solid ${themeGet('colors.gray.7')};
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;

          &:hover {
            border-top-color: ${themeGet('colors.gray.5')};
          }
        }
      }
    }

    &.yoctol-select__control-is-focused {
      border-color: ${themeGet('colors.secondaryDark')};
      ${controlShadow(themeGet('colors.secondaryDark'))};

      .yoctol-select__indicators {
        .yoctol-select__indicator.yoctol-select__dropdown-indicator {
          border-top-color: ${themeGet('colors.primaryDark')};
        }
      }
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

const Select = props => <StyledSelect {...props} />;

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
   * Allow the user to search for matching options
   */
  isSearchable: PropTypes.bool,
  /**
   * Specify the options the user can select from
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  /**
   * Change the text displayed when no option is selected
   */
  placeholder: PropTypes.string,
  /**
   * Control the current value
   */
  value: PropTypes.string.isRequired,
  /**
   * Subscribe to change events
   */
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  isClearable: false,
  isDisabled: false,
  isSearchable: false,
  placeholder: '',
};

export default Select;
