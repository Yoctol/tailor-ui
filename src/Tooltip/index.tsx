import React, { PureComponent, ReactElement } from 'react';

import Trigger, { IPopupRenderProps } from '../Trigger';

import BaseTooltip, { Arrow, Placement, TooltipContent } from './BaseTooltip';

export interface ITooltipProps {
  /**
   * The component which this tooltip show up
   */
  children: ReactElement<any>;
  /**
   * Whether the floating tooltip card is visible by default. Only support when the trigger is `click`
   */
  defaultVisible?: boolean;
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
}

class Tooltip extends PureComponent<ITooltipProps> {
  static defaultProps = {
    placement: 'top',
  };

  renderOverlay = ({
    styles,
    handleClose,
    handlePopupRef,
  }: IPopupRenderProps) => {
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
      <BaseTooltip styles={styles} ref={handlePopupRef}>
        <ContentComponent light={light} {...otherProps}>
          {content instanceof Function && trigger === 'click'
            ? content(handleClose)
            : content}
        </ContentComponent>
        <ArrowComponent light={light} placement={placement} />
      </BaseTooltip>
    );
  };

  render() {
    const {
      trigger,
      placement,
      defaultVisible,
      onVisibleChange,
      children,
    } = this.props;

    return (
      <Trigger
        appendFor="tooltip"
        offset={10}
        animation="scale"
        trigger={trigger}
        placement={placement}
        popup={this.renderOverlay}
        defaultVisible={defaultVisible}
        onVisibleChange={onVisibleChange}
      >
        {children}
      </Trigger>
    );
  }
}

export default Tooltip;
