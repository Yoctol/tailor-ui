import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space, borderRadius } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import theme from '../theme';

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
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  background-color: ${ifProp('active', themeGet('colors.bgLight'))};

  &:hover {
    text-decoration: none;
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    opacity: 0.5;
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
  text-decoration: none;
`;

Tab.propTypes = {
  active: PropTypes.bool,
};

Tab.defaultProps = {
  theme,
  active: false,
  size: 'm',
};

const TabsWrapper = styled.nav`
  display: flex;

  ${ifProp(
    { pills: false },
    css`
      position: absolute;
      bottom: -3px;
    `
  )};

  /* stylelint-disable no-duplicate-selectors */
  ${Tab} {
    flex-grow: ${ifProp('block', 1, 0)};
  }
  /* stylelint-enable */

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
  theme, // eslint-disable-line react/default-props-match-prop-types
  block: false,
  pills: false,
};

Tabs.Tab = Tab;

export default Tabs;
