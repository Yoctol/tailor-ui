import BaseSelect from 'react-select';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Select = styled(BaseSelect).attrs({
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

export default Select;
