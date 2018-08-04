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
<<<<<<< HEAD

const { Consumer, Provider } = createContext({});
=======
>>>>>>> refactor(tooltip): make render components changable

const ClickTooltip = ({
  children,
  display,
  onVisibleChange,
  placement,
  overlay,
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
<<<<<<< HEAD
      trigger,
=======
      hideTooltip,
>>>>>>> refactor(tooltip): make render components changable
      components,
      ...otherProps
    } = this.props;

    const {
      ContentComponent = TooltipContent,
      ArrowComponent = Arrow,
    } = components;

    return (
<<<<<<< HEAD
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
=======
      <>
        <ContentComponent light={light} {...otherProps}>
          {typeof content === 'function' ? content(hideTooltip) : content}
        </ContentComponent>
        <ArrowComponent light={light} placement={placement} />
      </>
>>>>>>> refactor(tooltip): make render components changable
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
  components: {},
  onVisibleChange: () => {},
};

export default Tooltip;
