import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

const Tab = styled.a`
  display: inline-block;
  position: relative;
  border-bottom: 3px solid transparent;
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

  ${ifProp(
    'active',
    css`
      border-bottom-color: ${themeGet('colors.secondary')};
    `
  )};

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

  ${space};
`;

Tab.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

Tab.defaultProps = {
  active: false,
  disabled: false,
  size: 'm',
};

Tab.displayName = 'Tabs.Tab';

const TabsWrapper = styled.nav`
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
      ${Tab /* sc-selector */} {
        flex-grow: 1;
      }
    `
  )};

  ${space};
`;

const Tabs = ({ absolute, children, size, ...otherProps }) => (
  <TabsWrapper absolute={absolute} {...otherProps}>
    {Children.map(children, child => cloneElement(child, { size }))}
  </TabsWrapper>
);

Tabs.propTypes = {
  absolute: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  ...space.propTypes,
};

Tabs.defaultProps = {
  absolute: false,
  block: false,
  size: 'm',
};

Tabs.Tab = Tab;

export default Tabs;
