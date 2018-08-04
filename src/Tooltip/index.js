import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import { Hover, Toggle } from 'react-powerplug';
import {
  borders,
  color,
  fontSize,
  minWidth,
  space,
  textAlign,
} from 'styled-system';

import ClickOutside from '../utils/ClickOutside';

import BaseTooltip, { TooltipWrapper } from './BaseTooltip';

const ClickTooltip = ({
  children,
  display,
  onVisibleChange,
  ...otherProps
}) => (
  <Toggle onChange={onVisibleChange}>
    {({ on, toggle, set }) => (
      <ClickOutside
        onClickOutside={() => {
          if (on) {
            set(false);
          }
        }}
      >
        {({ bind }) => (
          <TooltipWrapper innerRef={bind.ref} display={display}>
            {cloneElement(children, {
              onClick: event => {
                toggle();

                if (children.props.onClick) {
                  children.props.onClick(event);
                }
              },
            })}
            <BaseTooltip
              visible={on}
              hideTooltip={() => set(false)}
              {...otherProps}
            />
          </TooltipWrapper>
        )}
      </ClickOutside>
    )}
  </Toggle>
);

ClickTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.string.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
};

const HoverTooltip = ({
  children,
  display,
  onVisibleChange,
  ...otherProps
}) => (
  <Hover onChange={onVisibleChange}>
    {({ bind, hovered }) => (
      <TooltipWrapper display={display} {...bind}>
        {children}
        <BaseTooltip visible={hovered} {...otherProps} />
      </TooltipWrapper>
    )}
  </Hover>
);

HoverTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.string.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
};

class Tooltip extends PureComponent {
  render() {
    return this.props.trigger === 'click' ? (
      <ClickTooltip {...this.props} />
    ) : (
      <HoverTooltip {...this.props} />
    );
  }
}

Tooltip.propTypes = {
  /**
   * The component which this tooltip show up
   */
  children: PropTypes.node.isRequired,
  /**
   * A string or react component inside this tooltip.
   * If you are using click to trigger, it can be a
   * function that with `hide` callback as first argument
   */
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * The wrapper component's display style
   */
  display: PropTypes.string,
  /**
   * The style of this tooltip
   */
  light: PropTypes.bool,
  /**
   * The position base on the children component
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Decide how to trigger this tooltip
   */
  trigger: PropTypes.oneOf(['hover', 'click']),
  /**
   * 	Callback executed when visibility of the tooltip card is changed
   */
  onVisibleChange: PropTypes.func,
  ...space.propTypes,
  ...minWidth.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...fontSize.propTypes,
  ...textAlign.propTypes,
};

Tooltip.defaultProps = {
  light: false,
  content: '',
  placement: 'top',
  display: 'inline-block',
  trigger: 'hover',
  onVisibleChange: () => {},
};

export default Tooltip;
