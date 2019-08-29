import BaseSelect, { components } from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

import { Flex } from '../Layout';
import { Icon } from '../Icon';

const getStyledSelect = (creatable: boolean) => {
  const SelectComponent = creatable ? CreatableSelect : BaseSelect;

  return styled(SelectComponent)`
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
  `;
};

export interface SelectProps {
  /**
   * delimiter string for multi-select value in text style mode
   */
  delimiter?: string;
  /**
   * Is the select value clearable
   */
  isClearable?: boolean;
  /**
   * Allow create new option
   */
  creatable?: boolean;
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

const ValueContainer: FC<any> = ({ children, ...props }) => (
  <components.ValueContainer {...props}>
    <Flex width="100%" alignItems="center">
      <Icon type={MdSearch} size="20" mr="2" />
      <Flex flex="auto" position="relative">
        {children}
      </Flex>
    </Flex>
  </components.ValueContainer>
);

const Select: FC<SelectProps> = props => {
  const { isMulti, delimiter, multiSelectMode, creatable = false } = props;

  useEffect(() => {
    console.warn(
      '[tailor-ui: Select] Select component is deprecated. Please use the @tailor-ui/lab version instead.'
    );
  }, []);

  const StyledSelect = getStyledSelect(creatable);

  const isSearchable = creatable || props.isSearchable;

  let selectProps: any = {
    classNamePrefix: 'yoctol-select',
    createOptionPosition: 'first',
    ...props,
    isSearchable,
  };

  if (isSearchable) {
    selectProps.components = { ValueContainer };
  }

  if (isMulti) {
    if (multiSelectMode === 'text') {
      const Option: FC<any> = _props => (
        <components.Option {..._props} isFocused={_props.isSelected} />
      );

      const MultiValue = ({
        selectProps: {
          value: [{ value: firstValue }],
        },
        data: { value: dataValue, label: dataLabel },
      }: any) => `${firstValue !== dataValue ? delimiter : ''}${dataLabel}`;

      selectProps = {
        ...selectProps,
        components: {
          ...selectProps.components,
          Option,
          MultiValue,
        },
        closeMenuOnSelect: false,
        hideSelectedOptions: false,
      };
    }
  }

  return <StyledSelect {...selectProps} />;
};

Select.defaultProps = {
  delimiter: ',',
  isClearable: false,
  creatable: false,
  isDisabled: false,
  isMulti: false,
  isSearchable: false,
  multiSelectMode: 'tag',
  placeholder: '',
};

export { Select };
