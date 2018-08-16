import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement, createContext } from 'react';
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

import BaseTooltip, {
  Arrow,
  TooltipContent,
  TooltipWrapper,
} from './BaseTooltip';

const { Consumer, Provider } = createContext({});

const ClickTooltip = ({
  children,
  defaultVisible,
  display,
  onVisibleChange,
  placement,
  overlay,
}) => (
  <Toggle initial={defaultVisible} onChange={onVisibleChange}>
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
            <Provider value={() => set(false)}>
              <BaseTooltip
                visible={on}
                placement={placement}
                overlay={overlay}
              />
            </Provider>
          </TooltipWrapper>
        )}
      </ClickOutside>
    )}
  </Toggle>
);

ClickTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  defaultVisible: PropTypes.bool.isRequired,
  display: PropTypes.string.isRequired,
  overlay: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  onVisibleChange: PropTypes.func.isRequired,
};

const HoverTooltip = ({
  children,
  display,
  onVisibleChange,
  placement,
  overlay,
}) => (
  <Hover onChange={onVisibleChange}>
    {({ bind, hovered }) => (
      <TooltipWrapper display={display} {...bind}>
        {children}
        <BaseTooltip
          visible={hovered}
          placement={placement}
          overlay={overlay}
        />
      </TooltipWrapper>
    )}
  </Hover>
);

HoverTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.string.isRequired,
  overlay: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  onVisibleChange: PropTypes.func.isRequired,
};

class Tooltip extends PureComponent {
  renderOverlay = () => {
    const {
      light,
      content,
      placement,
      trigger,
      components,
      ...otherProps
    } = this.props;

    const {
      ContentComponent = TooltipContent,
      ArrowComponent = Arrow,
    } = components;

    return (
      <Consumer>
        {hideTooltip => (
          <>
            <ContentComponent light={light} {...otherProps}>
              {typeof content === 'function' && trigger === 'click'
                ? content(hideTooltip)
                : content}
            </ContentComponent>
            <ArrowComponent light={light} placement={placement} />
          </>
        )}
      </Consumer>
    );
  };

  render() {
    const overlay = this.renderOverlay();
    const RenderTooltip =
      this.props.trigger === 'click' ? ClickTooltip : HoverTooltip;
    return <RenderTooltip overlay={overlay} {...this.props} />;
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
   * Whether the floating tooltip card is visible by default. Only support when the trigger is `click`
   */
  defaultVisible: PropTypes.bool,
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
  components: {},
  content: '',
  display: 'inline-block',
  defaultVisible: false,
  light: false,
  placement: 'top',
  trigger: 'hover',
  onVisibleChange: () => {},
};

export default Tooltip;
