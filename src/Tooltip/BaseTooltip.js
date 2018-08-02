import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Transition, animated, config } from 'react-spring';
import {
  borderRadius,
  borders,
  color,
  fontSize,
  minWidth,
  space,
  textAlign,
  themeGet,
} from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

const TooltipToggle = styled.div`
  position: absolute;
  z-index: 99;

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

const AnimatedTooltipToggle = animated(TooltipToggle);

AnimatedTooltipToggle.propTypes = {
  placement: PropTypes.string.isRequired,
};

const TooltipContent = styled.div`
  border: ${themeGet('borders.default')};
  border-color: ${ifProp(
    'light',
    themeGet('colors.gray.7'),
    themeGet('colors.primaryDark')
  )};
  background-color: ${ifProp(
    'light',
    themeGet('colors.gray.9'),
    themeGet('colors.primaryDark')
  )};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${ifProp(
    'light',
    themeGet('colors.gray.2'),
    themeGet('colors.light')
  )};

  ${ifProp(
    { light: false },
    css`
      opacity: 0.8;
    `
  )};

  ${space};
  ${minWidth};
  ${color};
  ${borderRadius};
  ${fontSize};
  ${textAlign};
`;

TooltipContent.propTypes = {
  light: PropTypes.bool.isRequired,
  ...space.propTypes,
  ...minWidth.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...fontSize.propTypes,
  ...textAlign.propTypes,
};

TooltipContent.defaultProps = {
  minWidth: 120,
  fontSize: 'sm',
  p: 1,
  textAlign: 'center',
  borderRadius: 1,
};

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 5px solid
    ${ifProp(
      'light',
      themeGet('colors.gray.7'),
      themeGet('colors.primaryDark')
    )};
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;

  ${ifProp(
    { light: false },
    css`
      opacity: 0.8;
    `
  )};

  ${switchProp('placement', {
    top: css`
      left: 50%;
      margin-left: -4px;
    `,
    bottom: css`
      top: -5px;
      left: 50%;
      margin-left: -3px;
      transform: rotate(180deg);
    `,
    right: css`
      top: 50%;
      left: -7px;
      margin-top: -1px;
      transform: rotate(90deg);
    `,
    left: css`
      top: 50%;
      right: -7px;
      margin-top: -1px;
      transform: rotate(-90deg);
    `,
  })};

  ${ifProp(
    'light',
    css`
      &::after {
        content: '';
        position: absolute;
        top: -7px;
        left: -6px;
        border-top: 6px solid ${themeGet('colors.gray.9')};
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
      }
    `
  )};
`;

Arrow.propTypes = {
  light: PropTypes.bool.isRequired,
  placement: PropTypes.string.isRequired,
};

export const TooltipWrapper = styled.div`
  display: ${p => p.display};
  position: relative;
  z-index: 98;
`;

const BaseTooltip = ({ visible, ...props }) => (
  <Transition
    native
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
    config={config.gentle}
    {...props}
  >
    {visible &&
      (({
        opacity, // eslint-disable-line react/prop-types
        placement,
        light,
        content,
        closeTooltip,
        ...otherProps
      }) => (
        <AnimatedTooltipToggle style={{ opacity }} placement={placement}>
          <TooltipContent light={light} {...otherProps}>
            {content}
          </TooltipContent>
          <Arrow light={light} placement={placement} />
        </AnimatedTooltipToggle>
      ))}
  </Transition>
);

BaseTooltip.propTypes = {
  closeTooltip: PropTypes.func,
  content: PropTypes.node.isRequired,
  light: PropTypes.bool.isRequired,
  placement: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

BaseTooltip.defaultProps = {
  closeTooltip: () => {},
};

export default BaseTooltip;
