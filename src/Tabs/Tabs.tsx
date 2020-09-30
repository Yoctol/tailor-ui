import React, { FC, useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { SpaceProps, space } from 'styled-system';

import TabContext, { Size } from './TabContext';

interface StyledTabProps extends SpaceProps {
  size: Size;
  pills: boolean;
  active: boolean;
}

const StyledTab = styled.a<StyledTabProps>`
  display: inline-flex;
  position: relative;
  align-items: center;
  color: ${(p) => p.theme.colors.gray800};
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
    margin-left: ${(p) => p.theme.space[2]};
  }

  ${({
    size,
    theme: { heights, paddings, fontSizes },
  }: StyledTabProps & { theme: any }) =>
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
            border-bottom-color: ${theme.colors.primary};
          `};
        `};

  ${(p) => p.theme.transition /* sc-declaration */};
  ${space};
`;

export interface TabProps {
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

export const Tab: FC<TabProps> = ({ label, value, ...props }) => {
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

interface StyledTabsProps extends SpaceProps {
  /**
   * Make the tabs position to bottom of parent
   */
  absolute?: boolean;
  /**
   * Set the tabs width to 100%
   */
  block?: boolean;
}

const StyledTabs = styled.nav<StyledTabsProps>`
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

  ${space};
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

const Tabs: FC<TabsProps> & {
  Tab: typeof Tab;
} = ({
  absolute = false,
  pills = false,
  size = 'md' as Size,
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
        setValue: (value) => {
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

export { Tabs };
