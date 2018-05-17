import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  themeGet,
  space,
  color,
  borders,
  fontSize,
  textAlign,
  minWidth,
} from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';
import { withStateHandlers } from 'recompose';

import theme from '../theme';

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
  visible: PropTypes.bool.isRequired,
};

const Content = styled.div`
  border: ${themeGet('borders.default')} ${themeGet('colors.primaryDark')};
  border-radius: ${themeGet('radii.1')};

  ${ifProp(
    'light',
    css`
      background: ${themeGet('colors.light')};
      color: ${themeGet('colors.bodyFont')};
    `,
    css`
      background: ${themeGet('colors.primaryDark')};
      color: ${themeGet('colors.light')};
    `
  )};

  ${space};
  ${minWidth};
  ${color};
  ${borders};
  ${fontSize};
  ${textAlign};
`;

Content.propTypes = {
  light: PropTypes.bool.isRequired,
  ...space.propTypes,
  ...minWidth.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...fontSize.propTypes,
  ...textAlign.propTypes,
};

Content.defaultProps = {
  theme,
  minWidth: 120,
  fontSize: 'sm',
  p: 1,
  textAlign: 'center',
};

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 8px solid ${themeGet('colors.primaryDark')};
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

  &::after {
    position: absolute;
    top: -11px;
    left: -5px;
    border-top: 10px solid
      ${ifProp(
        'light',
        themeGet('colors.light'),
        themeGet('colors.primaryDark')
      )};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: '';
  }
`;

Arrow.propTypes = {
  light: PropTypes.bool.isRequired,
  placement: PropTypes.string.isRequired,
};

Arrow.defaultProps = {
  theme,
};

const TooltipWrapper = styled.div`
  position: relative;
  z-index: 98;
  display: inline-block;

  ${ifProp(
    { trigger: 'hover' },
    css`
      &:hover {
        /* stylelint-disable no-duplicate-selectors */
        ${TooltipToggle} {
          display: block;
        }
        /* stylelint-enable */
      }
    `
  )};
`;

TooltipWrapper.propTypes = {
  trigger: PropTypes.string.isRequired,
};

const Tooltip = withStateHandlers(
  ({ trigger, visible }) => ({ trigger, visible }),
  {
    toggleVisible: ({ visible, trigger }) => () => {
      if (trigger === 'click') {
        return { visible: !visible };
      }
    },
  }
)(
  ({
    toggleVisible,
    trigger,
    visible,
    children,
    content,
    light,
    placement,
    ...otherProps
  }) => (
    <TooltipWrapper trigger={trigger} onClick={() => toggleVisible()}>
      {children}
      <TooltipToggle visible={visible} placement={placement}>
        <Content light={light} {...otherProps}>
          {content}
        </Content>
        <Arrow light={light} placement={placement} />
      </TooltipToggle>
    </TooltipWrapper>
  )
);

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  light: PropTypes.bool,
  placement: PropTypes.string,
  trigger: PropTypes.string,
  visible: PropTypes.bool,
};

Tooltip.defaultProps = {
  children: '',
  content: PropTypes.node,
  light: false,
  placement: 'top',
  trigger: 'hover',
  visible: false,
};

export default Tooltip;