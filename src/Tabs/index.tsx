import React, { PureComponent, SFC, createContext } from 'react';
import { Value } from 'react-powerplug';
import { space as styledSpace } from 'styled-system';

import styled, { css } from 'utils/styled-components';

type Size = 'sm' | 'md' | 'lg';

const { Provider, Consumer } = createContext<{
  activeValue: string;
  setValue: (value: string) => void;
  size: Size;
  pills: boolean;
}>({
  activeValue: '',
  setValue: () => {},
  size: 'md',
  pills: false,
});

interface StyledTabProps {
  size: Size;
  pills: boolean;
  active: boolean;
}

const StyledTab = styled<StyledTabProps, 'a'>('a')`
  display: inline-flex;
  position: relative;
  align-items: center;
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
    margin-left: ${p => p.theme.space[2]};
  }

  ${({ size, theme: { heights, paddings, fontSizes } }) =>
    ({
      sm: css`
        height: ${heights.sm};
        padding: 0 ${paddings.sm};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        height: ${heights.base};
        padding: 0 ${paddings.md};
        font-size: ${fontSizes.base};
      `,
      lg: css`
        height: ${heights.lg};
        padding: 0 ${paddings.lg};
        font-size: ${fontSizes.lg};
      `,
    }[size])};

  ${({ pills, active }) =>
    pills
      ? css`
          border-radius: 999px;
          ${active &&
            css`
              background-color: ${p => p.theme.colors.primary};
              color: ${p => p.theme.colors.light};
            `};
        `
      : css`
          border-bottom: 3px solid transparent;

          ${active &&
            css`
              border-bottom-color: ${p => p.theme.colors.secondary};
            `};
        `};

  ${p => p.theme.transition /* sc-declaration */};
  ${styledSpace};
`;

export type TabProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const Tab: SFC<TabProps> = ({ label, value, ...props }) => (
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

// Tab.propTypes = {
//   /**
//    * Disabled state of tab
//    */
//   disabled: PropTypes.bool,
//   /**
//    * Content of tab
//    */
//   label: PropTypes.node,
//   /**
//    * Tab's value
//    */
//   value: PropTypes.string,
// };

// Tab.defaultProps = {
//   label: '',
//   disabled: false,
//   value: '',
// };

interface StyledTabsProps {
  /**
   * Make the tabs position to bottom of parent
   */
  absolute?: boolean;
  /**
   * Set the tabs width to 100%
   */
  block?: boolean;
}

const StyledTabs = styled<StyledTabsProps, 'nav'>('nav')`
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

type TabsProps = StyledTabsProps & {
  /**
   * Initial active Tab's value, if `activeValue` is not set.
   */
  defaultActiveValue?: string;
  /**
   * Current Tab's value
   */
  activeValue?: string;
  /**
   * Callback executed when active tab is changed
   */
  onChange?: (activeValue: string) => void;
  /**
   * Pills style of tabs
   */
  pills?: boolean;
  /**
   * Preset tab bar size
   */
  size?: Size;
};

class Tabs extends PureComponent<TabsProps> {
  static Tab = Tab;

  render() {
    const {
      absolute = false,
      pills = false,
      size = 'md',
      children,
      defaultActiveValue,
      activeValue,
      onChange,
      ...otherProps
    } = this.props;

    return (
      <Value
        initial={defaultActiveValue}
        onChange={value => {
          if (onChange && value) {
            onChange(value);
          }
        }}
      >
        {({ value, set }) => (
          <StyledTabs absolute={absolute} {...otherProps}>
            <Provider
              value={{
                activeValue: activeValue || value || '',
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
  }
}

export default Tabs;
