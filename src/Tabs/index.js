import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import styled, { css } from 'styled-components';
import { Value } from 'react-powerplug';
import { space as styledSpace, themeGet } from 'styled-system';

const { Provider, Consumer } = createContext();

const StyledTab = styled.a`
  display: inline-block;
  position: relative;
  color: ${p => p.theme.colors.dark};
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  &:not(:first-child) {
    margin-left: ${themeGet('space.3')};
  }

  ${({ size, theme: { space, fontSizes } }) =>
    ({
      sm: css`
        padding: ${space.paddingYSm} ${space.paddingXSm};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        padding: ${space.paddingY} ${space.paddingX};
        font-size: ${fontSizes.default};
      `,
      lg: css`
        padding: ${space.paddingYLg} ${space.paddingXLg};
        font-size: ${fontSizes.lg};
      `,
    }[size])};

  ${({ pills, active, size, theme: { space } }) =>
    pills
      ? css`
          border-radius: 999px;

          ${{
            sm: css`
              padding: ${space.paddingYSm} calc(${space.paddingXSm} * 2);
            `,
            md: css`
              padding: ${space.paddingY} calc(${space.paddingX} * 2);
            `,
            lg: css`
              padding: ${space.paddingYLg} calc(${space.paddingXLg} * 2);
            `,
          }[size]};

          ${active &&
            css`
              background-color: ${themeGet('colors.primary')};
              color: ${themeGet('colors.light')};
            `};
        `
      : css`
          border-bottom: 3px solid transparent;

          ${active &&
            css`
              border-bottom-color: ${themeGet('colors.secondary')};
            `};
        `};

  ${p => p.theme.transition /* sc-declaration */};
  ${styledSpace};
`;

export const Tab = ({ label, value, ...props }) => (
  <Consumer>
    {({ size, pills, activeValue, setValue }) => (
      <StyledTab
        size={size}
        pills={pills}
        active={activeValue === value}
        onClick={() => setValue(value)}
        {...props}
      >
        {label}
      </StyledTab>
    )}
  </Consumer>
);

Tab.propTypes = {
  /**
   * Disabled state of tab
   */
  disabled: PropTypes.bool,
  /**
   * Content of tab
   */
  label: PropTypes.node,
  /**
   * Tab's value
   */
  value: PropTypes.string,
};

Tab.defaultProps = {
  label: '',
  disabled: false,
  value: '',
};

Tab.displayName = 'Tabs.Tab';

const StyledTabs = styled.nav`
  display: flex;

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      bottom: -3px;
    `};

  ${({ block }) =>
    block &&
    css`
      right: 0;
      left: 0;
      padding-right: inherit;
      padding-left: inherit;
      ${StyledTab /* sc-selector */} {
        flex-grow: 1;
      }
    `};

  ${styledSpace};
`;

const Tabs = ({
  absolute,
  children,
  size,
  pills,
  defaultActiveValue,
  activeValue,
  onChange,
  ...otherProps
}) => (
  <Value initial={defaultActiveValue} onChange={onChange}>
    {({ value, set }) => (
      <StyledTabs absolute={absolute} {...otherProps}>
        <Provider
          value={{
            activeValue: activeValue || value,
            setValue: set,
            size,
            pills,
          }}
        >
          {children}
        </Provider>
      </StyledTabs>
    )}
  </Value>
);

Tabs.propTypes = {
  /**
   * Make the tabs position to bottom of parent
   */
  absolute: PropTypes.bool,
  /**
   * Current Tab's value
   */
  activeValue: PropTypes.string,
  /**
   * Set the tabs width to 100%
   */
  block: PropTypes.bool,
  /**
   * The Tab component which will render in Tabs
   */
  children: PropTypes.node.isRequired,
  /**
   * Initial active Tab's value, if `activeValue` is not set.
   */
  defaultActiveValue: PropTypes.string,
  /**
   * Pills style of tabs
   */
  pills: PropTypes.bool,
  /**
   * Preset tab bar size
   */
  size: PropTypes.string,
  /**
   * Callback executed when active tab is changed
   */
  onChange: PropTypes.func,
  ...styledSpace.propTypes,
};

Tabs.defaultProps = {
  absolute: false,
  block: false,
  pills: false,
  defaultActiveValue: '',
  activeValue: '',
  onChange: () => {},
  size: 'md',
};

Tabs.Tab = Tab;

export default Tabs;
