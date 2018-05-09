import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space, color, borders, fontSize } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import theme from '../theme';

const TooltipWrapper = styled.div`
  position: relative;
  z-index: 98;
  display: inline-block;
`;

const TooltipToggle = styled.div`
  position: absolute;
  z-index: 99;
  display: ${ifProp('visible', 'block', 'none')};
  ${switchProp('placement', {
    top: css`
      bottom: 100%;
      left: 50%;
      margin-bottom: 10px;
      transform: translateX(-50%);
    `,
    bottom: css`
      top: 100%;
      left: 50%;
      margin-top: 10px;
      transform: translateX(-50%);
    `,
    right: css`
      top: 50%;
      left: 100%;
      margin-left: 10px;
      transform: translateY(-50%);
    `,
    left: css`
      top: 50%;
      right: 100%;
      margin-right: 10px;
      transform: translateY(-50%);
    `,
  })};
`;

TooltipToggle.propTypes = {
  placement: PropTypes.string.isRequired,
};

const Content = styled.div`
  min-width: 132px;
  padding: ${themeGet('space.2')};
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.4')};
  border-radius: ${themeGet('radii.2')};
  ${ifProp(
    'dark',
    css`
      background: ${themeGet('colors.gray.4')};
      color: ${themeGet('colors.light')};
    `,
    css`
      background: ${themeGet('colors.light')};
      color: ${themeGet('colors.bodyFont')};
    `
  )};
  ${space};
  ${color};
  ${borders};
  ${fontSize};
`;

Content.propTypes = {
  dark: PropTypes.bool.isRequired,
  ...space.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...fontSize.propTypes,
};

Content.defaultProps = {
  theme,
  fontSize: 'default',
};

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 8px solid ${themeGet('colors.gray.4')};
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  ${switchProp('placement', {
    top: css`
      left: 50%;
      margin-left: -2px;
    `,
    bottom: css`
      top: -8px;
      left: 50%;
      margin-left: -2px;
      transform: rotate(180deg);
    `,
    right: css`
      top: 50%;
      left: -8px;
      margin-top: -2px;
      transform: rotate(90deg);
    `,
    left: css`
      top: 50%;
      right: -8px;
      margin-top: -2px;
      transform: rotate(-90deg);
    `,
  })};

  ::after {
    position: absolute;
    top: -11px;
    left: -5px;
    border-top: 10px solid
      ${ifProp('dark', themeGet('colors.gray.4'), themeGet('colors.light'))};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: '';
  }
`;

Arrow.propTypes = {
  dark: PropTypes.bool.isRequired,
  placement: PropTypes.string.isRequired,
};

Arrow.defaultProps = {
  theme,
};

const Tooltip = ({
  children,
  visible,
  content,
  dark,
  placement,
  ...otherProps
}) => (
  <TooltipWrapper>
    {children}
    <TooltipToggle visible={visible} placement={placement}>
      <Content dark={dark} {...otherProps}>
        {content}
      </Content>
      <Arrow dark={dark} placement={placement} />
    </TooltipToggle>
  </TooltipWrapper>
);

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  dark: PropTypes.bool,
  placement: PropTypes.string,
  visible: PropTypes.bool,
};

Tooltip.defaultProps = {
  children: '',
  content: PropTypes.node,
  dark: true,
  placement: 'top',
  visible: false,
};

export default Tooltip;
