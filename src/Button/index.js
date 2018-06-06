import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, space } from 'styled-system';
import createPropsTransform from 'react-props-classnames';

import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';

const propsTransform = createPropsTransform({
  prefix: 'button',
  props: ['size', 'block', 'circle', 'light', 'ghost', 'active'],
});

const Button = styled.button`
  display: inline-block;
  border: ${themeGet('borders.default')};
  border-radius: ${themeGet('radii.1')};
  border-color: ${themeGet('colors.primary')};
  background-color: ${themeGet('colors.primaryDark')};
  color: ${themeGet('colors.light')};
  line-height: ${themeGet('lineHeight')};
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &.button-size-sm {
    height: ${themeGet('space.sizeSm')};
    padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
    font-size: ${themeGet('fontSizes.sm')};
  }

  &.button-size-m {
    height: ${themeGet('space.size')};
    padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
    font-size: ${themeGet('fontSizes.default')};
  }

  &.button-size-lg {
    height: ${themeGet('space.sizeLg')};
    padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
    font-size: ${themeGet('fontSizes.lg')};
  }

  &.button-block {
    width: 100%;
  }

  &.button-light {
    border-color: ${themeGet('colors.border')};
    background-color: ${themeGet('colors.bgLight')};
    color: ${themeGet('colors.bodyFont')};

    &:focus {
      border-color: ${themeGet('colors.primaryDark')};
      ${controlShadow(themeGet('colors.primary'))};
    }

    &:hover {
      background-color: ${themeGet('colors.gray.8')};
    }

    &.button-active {
      border-color: ${themeGet('colors.secondaryDark')};
      background-color: ${themeGet('colors.secondaryDark')};
      color: ${themeGet('colors.light')};

      &:hover {
        background-color: ${themeGet('colors.secondary')};
      }

      &:focus {
        border-color: ${themeGet('colors.secondaryDark')};
      }
    }
  }

  &.button-circle {
    border-radius: 999px;

    &.button-size-sm {
      padding: ${themeGet('space.paddingYSm')}
        calc(${themeGet('space.paddingXSm')} * 2);
    }

    &.button-size-m {
      padding: ${themeGet('space.paddingY')}
        calc(${themeGet('space.paddingX')} * 2);
    }

    &.button-size-lg {
      padding: ${themeGet('space.paddingYLg')}
        calc(${themeGet('space.paddingXLg')} * 2);
    }
  }

  &.button-ghost {
    border-color: ${themeGet('colors.light')};
    background-color: transparent;

    &:focus {
      background-color: ${themeGet('colors.primary')};
      ${controlShadow(themeGet('colors.light'))};
    }
  }

  &:focus {
    border-color: ${themeGet('colors.primaryDark')};
    outline: 0;
    ${controlShadow(themeGet('colors.primary'))};
  }

  &:hover {
    background-color: ${themeGet('colors.primary')};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  ${controlTransition()};
  ${space};
`;

Button.propTypes = {
  active: PropTypes.bool,
  block: PropTypes.bool,
  circle: PropTypes.bool,
  ghost: PropTypes.bool,
  light: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
  ...space.propTypes,
};

Button.defaultProps = {
  size: 'm',
  block: false,
  circle: false,
  ghost: false,
  light: false,
  active: false,
};

export default propsTransform(Button);
