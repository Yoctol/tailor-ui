import React, { SFC, useContext, useState } from 'react';
import { space as styledSpace } from 'styled-system';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

import TabContext, { Size } from './TabContext';

type IStyledTabProps = ICssProps & {
  size: Size;
  pills: boolean;
  active: boolean;
};

const StyledTab = styled<IStyledTabProps, 'a'>(tag.a)`
  display: inline-flex;
  position: relative;
  align-items: center;
  color: ${p => p.theme.colors.gray800};
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

  ${({ pills, active, theme }) =>
    pills
      ? css`
          border-radius: ${theme.radii.lg};
          color: ${theme.colors.gray600};

          ${active
            ? css`
                background-color: ${theme.colors.primary};
                color: ${theme.colors.light};
              `
            : css`
                &:hover {
                  background-color: ${theme.colors.gray300};
                  color: ${theme.colors.gray700};
                }
              `};
        `
      : css`
          border-bottom: 3px solid transparent;

          ${active &&
            css`
              border-bottom-color: ${theme.colors.secondary};
            `};
        `};

  ${p => p.theme.transition /* sc-declaration */};
  ${styledSpace};
  ${styledCss};
`;

export interface ITabProps {
  /**
   * label of tab
   */
  label: string;
  /**
   * Tab's value
   */
  value: string;
  /**
   * Disabled state of tab
   */
  disabled?: boolean;
}

export const Tab: SFC<ITabProps> = ({ label, value, ...props }) => {
  const { size, pills, activeValue, setValue } = useContext(TabContext);

  return (
    <StyledTab
      size={size}
      pills={pills}
      active={activeValue === value}
      onClick={() => setValue(value)}
      {...props}
    >
      {label}
    </StyledTab>
  );
};

type IStyledTabsProps = ICssProps & {
  /**
   * Make the tabs position to bottom of parent
   */
  absolute?: boolean;
  /**
   * Set the tabs width to 100%
   */
  block?: boolean;
};

const StyledTabs = styled<IStyledTabsProps, 'nav'>(tag.nav)`
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
  ${styledCss};
`;

type TabsProps = IStyledTabsProps & {
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

const Tabs: SFC<TabsProps> & {
  Tab: typeof Tab;
} = ({
  absolute = false,
  pills = false,
  size = 'md',
  children,
  defaultActiveValue,
  activeValue,
  onChange,
  ...otherProps
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveValue);

  return (
    <TabContext.Provider
      value={{
        activeValue: activeValue || activeTab || '',
        setValue: value => {
          setActiveTab(value);

          if (onChange && value) {
            onChange(value);
          }
        },
        size,
        pills,
      }}
    >
      <StyledTabs absolute={absolute} {...otherProps}>
        {children}
      </StyledTabs>
    </TabContext.Provider>
  );
};

Tabs.Tab = Tab;

export default Tabs;
