import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space, borderRadius } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

const PillsTab = css`
  border-radius: ${themeGet('radii.1')};
  background-color: ${ifProp(
    'active',
    themeGet('colors.gray.8'),
    themeGet('colors.bgLight')
  )};
`;

const DefaultTab = css`
  border-bottom: 3px solid transparent;

  ${ifProp(
    'active',
    css`
      border-color: ${themeGet('colors.secondary')};
    `
  )};
`;

const Tab = styled.a`
  display: inline-block;
  position: relative;
  background-color: ${ifProp('active', themeGet('colors.bgLight'))};
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

  ${switchProp('size', {
    sm: css`
      height: ${themeGet('space.sizeSm')};
      padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
      font-size: ${themeGet('fontSizes.sm')};
    `,

    m: css`
      height: ${themeGet('space.size')};
      padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
      font-size: ${themeGet('fontSizes.default')};
    `,

    lg: css`
      height: ${themeGet('space.sizeLg')};
      padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
      font-size: ${themeGet('fontSizes.lg')};
    `,
  })};

  ${ifProp('pills', PillsTab, DefaultTab)};

  ${space};
  ${borderRadius};
`;

Tab.propTypes = {
  active: PropTypes.bool,
};

Tab.defaultProps = {
  active: false,
  size: 'm',
};

const TabsWrapper = styled.nav`
  display: flex;

  ${ifProp(
    { pills: false, absolute: true },
    css`
      position: absolute;
      bottom: -3px;
    `
  )};

  ${Tab /* sc-selector */} {
    flex-grow: ${ifProp('block', 1, 0)};
  }

  ${space};
`;

const Tabs = ({ children, pills, size, ...otherProps }) => (
  <TabsWrapper pills={pills} {...otherProps}>
    {Children.map(children, child => cloneElement(child, { pills, size }))}
  </TabsWrapper>
);

Tabs.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  pills: PropTypes.bool,
  ...space.propTypes,
};

Tabs.defaultProps = {
  block: false,
  pills: false,
};

Tabs.Tab = Tab;

export default Tabs;
