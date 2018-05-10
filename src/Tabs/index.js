import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

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
  margin-bottom: -1px;
  border: ${themeGet('borders.default')} transparent;
  border-bottom: 0;
  border-radius: 3px 3px 0 0;
  ${ifProp(
    'active',
    css`
      border-color: ${themeGet('colors.border')};
    `
  )};
`;

const Tab = styled.a`
  position: relative;
  display: inline-block;
  height: ${themeGet('space.size')};
  padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
  text-align: center;
  cursor: pointer;
  background-color: ${ifProp('active', themeGet('colors.bgLight'))};

  :hover {
    text-decoration: none;
  }

  ${ifProp('pills', PillsTab, DefaultTab)};
  ${space} ${borderRadius};
  text-decoration: none;
`;

Tab.propTypes = {
  active: PropTypes.bool,
};

Tab.defaultProps = {
  theme,
  active: false,
};

const TabsWrapper = styled.nav`
  display: flex;
  ${ifProp(
    { pills: false },
    css`
      border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
    `
  )};

  ${Tab} {
    flex-grow: ${ifProp('block', 1, 0)};
  }

  ${space};
`;

const Tabs = ({ children, pills, ...otherProps }) => (
  <TabsWrapper pills={pills} {...otherProps}>
    {Children.map(children, child => cloneElement(child, { pills }))}
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
