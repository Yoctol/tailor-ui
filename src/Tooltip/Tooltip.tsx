import React, { PureComponent, ReactElement } from 'react';
import { omit } from 'ramda';

import Trigger, { IPopupRenderProps } from '../Trigger';
import { Omit } from '../utils/type';

import BaseTooltip, {
  Arrow,
  Placement,
  TooltipContent,
  TooltipContentProps,
} from './BaseTooltip';

export type ITooltipProps = Omit<TooltipContentProps, 'light'> & {
  /**
   * The component which this tooltip show up
   */
  children: ReactElement<any>;
  /**
   * Whether the floating tooltip card is visible by default. Only support when the trigger is `click`
   */
  defaultVisible?: boolean;
  /**
   * Whether the floating tooltip card is visible. Only support when the trigger is `click`
   */
  visible?: boolean;
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
      <div style={styles} ref={handlePopupRef}>
        <ContentComponent
          light={light}
          {...omit(['onVisibleChange'], otherProps)}
        >
          {content instanceof Function && trigger === 'click'
            ? content(handleClose)
            : content}
        </ContentComponent>
        <ArrowComponent light={light} placement={placement} />
      </div>
    );
  };

  render() {
    const {
      trigger,
      placement,
      defaultVisible,
      visible,
      onVisibleChange,
      children,
    } = this.props;

    return (
      <Trigger
        zIndex="10000"
        appendFor="tooltip"
        offset={10}
        animation="scale"
        trigger={trigger}
        placement={placement}
        popup={this.renderOverlay}
        defaultVisible={defaultVisible}
        visible={visible}
        onVisibleChange={onVisibleChange}
      >
        {children}
      </Trigger>
    );
  }
}

export default Tooltip;
