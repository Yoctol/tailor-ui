import React, { SFC, PureComponent, cloneElement, createContext } from 'react';
import { Hover, Toggle } from 'react-powerplug';
import ClickOutside from '../utils/ClickOutside';

import BaseTooltip, {
  Arrow,
  TooltipContent,
  TooltipWrapper,
  Placement,
  ArrowProps,
  TooltipContentProps,
} from './BaseTooltip';

const { Consumer, Provider } = createContext(() => {});

interface ClickTooltipProps {
  children: React.ReactElement<any>;
  defaultVisible: boolean;
  display: string;
  onVisibleChange: (visible: boolean) => void;
  placement: Placement;
  overlay: React.ReactNode;
}

const ClickTooltip: SFC<ClickTooltipProps> = ({
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
        {({ bindRef }) => (
          <TooltipWrapper innerRef={bindRef} display={display}>
            {cloneElement(children, {
              onClick: (event: Event) => {
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

interface HoverTooltipProps {
  children: React.ReactElement<any>;
  display: string;
  onVisibleChange: (visible: boolean) => void;
  placement: Placement;
  overlay: React.ReactNode;
}

const HoverTooltip: SFC<HoverTooltipProps> = ({
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

export type TooltipProps = HoverTooltipProps &
  ClickTooltipProps &
  ArrowProps & {
    content: React.ReactNode | ((hideTooltip: () => void) => React.ReactNode);
    trigger: 'click' | 'hover';
    components: {
      ContentComponent: React.ComponentClass<TooltipContentProps>;
      ArrowComponent: React.ComponentClass<ArrowProps>;
    };
  };

class Tooltip extends PureComponent<TooltipProps> {
  renderOverlay = () => {
    const {
      light = false,
      content,
      placement = 'top',
      trigger = 'hover',
      components: {
        ContentComponent = TooltipContent,
        ArrowComponent = Arrow,
      } = {},
      ...otherProps
    } = this.props;

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

// Tooltip.propTypes = {
//   /**
//    * The component which this tooltip show up
//    */
//   children: PropTypes.node.isRequired,
//   /**
//    * A string or react component inside this tooltip.
//    * If you are using click to trigger, it can be a
//    * function that with `hide` callback as first argument
//    */
//   content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
//   /**
//    * Whether the floating tooltip card is visible by default. Only support when the trigger is `click`
//    */
//   defaultVisible: PropTypes.bool,
//   /**
//    * The wrapper component's display style
//    */
//   display: PropTypes.string,
//   /**
//    * The style of this tooltip
//    */
//   light: PropTypes.bool,
//   /**
//    * The position base on the children component
//    */
//   placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
//   /**
//    * Decide how to trigger this tooltip
//    */
//   trigger: PropTypes.oneOf(['hover', 'click']),
//   /**
//    * 	Callback executed when visibility of the tooltip card is changed
//    */
//   onVisibleChange: PropTypes.func,
//   ...space.propTypes,
//   ...minWidth.propTypes,
//   ...color.propTypes,
//   ...borders.propTypes,
//   ...fontSize.propTypes,
//   ...textAlign.propTypes,
// };

export default Tooltip;
