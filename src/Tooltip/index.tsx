import React, {
  PureComponent,
  ReactChild,
  ReactElement,
  ReactNode,
  SFC,
  cloneElement,
  createContext,
} from 'react';
import { Hover, Toggle } from 'react-powerplug';

import ClickOutside from '../utils/ClickOutside';

import BaseTooltip, {
  Arrow,
  Placement,
  TooltipContent,
  TooltipWrapper,
} from './BaseTooltip';

const { Consumer, Provider } = createContext(() => {});

interface ClickTooltipProps {
  children: ReactElement<any>;
  defaultVisible?: boolean;
  display?: string;
  onVisibleChange?: (visible: boolean) => void;
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
  children: ReactChild | ReactChild[];
  display?: string;
  onVisibleChange?: (visible: boolean) => void;
  placement: Placement;
  overlay: ReactNode;
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

export type TooltipProps = {
  /**
   * The component which this tooltip show up
   */
  children: ReactElement<any> | ReactChild | ReactChild[];
  /**
   * Whether the floating tooltip card is visible by default. Only support when the trigger is `click`
   */
  defaultVisible?: boolean;
  /**
   * The wrapper component's display style
   */
  display?: string;
  /**
   * 	Callback executed when visibility of the tooltip card is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * The position base on the children component
   */
  placement?: Placement;
  /**
   * The style of this tooltip
   */
  light?: boolean;
  /**
   * A string or react component inside this tooltip.
   * If you are using click to trigger, it can be a
   * function that with `hide` callback as first argument
   */
  content: React.ReactNode | ((hideTooltip: () => void) => React.ReactNode);
  /**
   * Decide how to trigger this tooltip
   */
  trigger?: 'click' | 'hover';
  components?: {
    ContentComponent: any;
    ArrowComponent: any;
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
              {content instanceof Function && trigger === 'click'
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
    const { trigger, placement = 'top' } = this.props;
    const overlay = this.renderOverlay();
    const RenderTooltip = trigger === 'click' ? ClickTooltip : HoverTooltip;

    return (
      <RenderTooltip overlay={overlay} placement={placement} {...this.props} />
    );
  }
}

export default Tooltip;
