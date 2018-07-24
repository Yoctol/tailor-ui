import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import styled, { css } from 'styled-components';
import { ifProp, switchProp } from 'styled-tools';
import { space, themeGet } from 'styled-system';

const { Provider, Consumer } = createContext();

const StyledTab = styled.a`
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

  ${space};
`;

const Tab = ({ children, ...props }) => (
  <Consumer>
    {size => (
      <StyledTab size={size} {...props}>
        {children}
      </StyledTab>
    )}
  </Consumer>
);

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

Tab.defaultProps = {
  active: false,
  disabled: false,
  size: 'm',
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

const Tabs = ({ absolute, children, size, ...otherProps }) => (
  <StyledTabs absolute={absolute} {...otherProps}>
    <Provider value={size}>{children}</Provider>
  </StyledTabs>
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
