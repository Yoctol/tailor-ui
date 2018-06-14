import styled from 'styled-components';
import BaseSelect from 'react-select';
import { themeGet } from 'styled-system';

import { controlShadow } from '../utils/shadow';

const Select = styled(BaseSelect).attrs({
  classNamePrefix: 'yoctol-select',
})`
  & .yoctol-select__control {
    min-width: 150px;
    border-color: ${themeGet('colors.gray.8')};
    background-color: ${themeGet('colors.light')};

    &:hover {
      border-color: ${themeGet('colors.gray.4')};
    }

    &.yoctol-select__control-is-focused {
      border-color: ${themeGet('colors.secondaryDark')};
      ${controlShadow(themeGet('colors.secondaryDark'))};
    }

    .yoctol-select__value-container {
      /* empty */
    }

    & .yoctol-select__indicators {
      &::before {
        content: '';
        position: relative;
        right: 10px;
        width: 0;
        height: 0;
        border-top: 5px solid black;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
      }

      .yoctol-select__indicator-separator {
        display: none;
      }

      .yoctol-select__indicator {
        display: none;
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
            ${themeGet('colors.border')};
        }
        background-color: ${themeGet('colors.light')};
        color: ${themeGet('colors.bodyFont')};

        &.yoctol-select__option--is-focused {
          background-color: ${themeGet('colors.primaryDark')};
          color: ${themeGet('colors.light')};
        }
      }
    }
  }
`;

export default Select;
