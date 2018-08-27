import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import styled, { css } from 'styled-components';
import { Value } from 'react-powerplug';
import { ifProp, switchProp } from 'styled-tools';
import { space, themeGet } from 'styled-system';

const { Provider, Consumer } = createContext();

const StyledTab = styled.a`
  display: inline-block;
  position: relative;
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

  ${switchProp('size', {
    sm: css`
      padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
      font-size: ${themeGet('fontSizes.sm')};
    `,

    m: css`
      padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
      font-size: ${themeGet('fontSizes.default')};
    `,

    lg: css`
      padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
      font-size: ${themeGet('fontSizes.lg')};
    `,
  })};

  ${ifProp(
    'pills',
    css`
      border-radius: 999px;

      ${switchProp('size', {
        sm: css`
          padding: ${themeGet('space.paddingYSm')}
            calc(${themeGet('space.paddingXSm')} * 2);
        `,

        m: css`
          padding: ${themeGet('space.paddingY')}
            calc(${themeGet('space.paddingX')} * 2);
        `,

        lg: css`
          padding: ${themeGet('space.paddingYLg')}
            calc(${themeGet('space.paddingXLg')} * 2);
        `,
      })};

      ${ifProp(
        'active',
        css`
          background-color: ${themeGet('colors.primary')};
          color: ${themeGet('colors.light')};
        `
      )};
    `,
    css`
      border-bottom: 3px solid transparent;

      ${ifProp(
        'active',
        css`
          border-bottom-color: ${themeGet('colors.secondary')};
        `
      )};
    `
  )};

  ${p => p.theme.transition /* sc-declaration */};
  ${space};
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

  ${ifProp(
    'absolute',
    css`
      position: absolute;
      bottom: -3px;
    `
  )};

  ${ifProp(
    'block',
    css`
      right: 0;
      left: 0;
      padding-right: inherit;
      padding-left: inherit;
      ${StyledTab /* sc-selector */} {
        flex-grow: 1;
      }
    `
  )};

  ${space};
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
  ...space.propTypes,
};

Tabs.defaultProps = {
  absolute: false,
  block: false,
  pills: false,
  defaultActiveValue: '',
  activeValue: '',
  onChange: () => {},
  size: 'm',
};

Tabs.Tab = Tab;

export default Tabs;
