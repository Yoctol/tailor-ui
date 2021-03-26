import React, { Children, ReactNode, cloneElement } from 'react';
import {
  TooltipProps as DefaultTooltipProps,
  TooltipPopup,
  useTooltip,
} from '@reach/tooltip';
import { animated, useTransition } from 'react-spring';
import { forwardRefWithAs } from '@reach/utils';

import { Stack } from '../../Stack';

import { TooltipStyle } from './styles';

const AnimatedTooltipContent = animated(TooltipPopup);

interface TooltipProps
  extends Omit<DefaultTooltipProps, 'label' | 'ariaLabel'> {
  content: ReactNode;
}

const Tooltip = forwardRefWithAs<TooltipProps, 'div'>(
  ({ children, id, DEBUG_STYLE, content, ...props }, forwardedRef) => {
    const child = Children.only(children) as any;

    const [trigger, tooltip, isVisible] = useTooltip({
      id,
      onMouseEnter: child.props.onMouseEnter,
      onMouseMove: child.props.onMouseMove,
      onMouseLeave: child.props.onMouseLeave,
      onFocus: child.props.onFocus,
      onBlur: child.props.onBlur,
      onKeyDown: child.props.onKeyDown,
      onMouseDown: child.props.onMouseDown,
      ref: child.ref,
      DEBUG_STYLE,
    });

    const transitions = useTransition(isVisible ? tooltip : null, {
      from: {
        opacity: 0,
        transform: 'scale(0.9)',
      },
      enter: {
        opacity: 1,
        transform: 'scale(1)',
      },
      leave: {
        opacity: 0,
        transform: 'scale(1)',
      },
      config: (item) => ({
        mass: 1,
        tension: item ? 500 : 1500,
        friction: item ? 40 : 1200,
      }),
    });

    return (
      <Stack>
        {(stackingOrder) => (
          <>
            <TooltipStyle />

            {cloneElement(child, trigger)}

            {transitions(
              (style, item) =>
                item && (
                  <AnimatedTooltipContent
                    ref={forwardedRef}
                    label={content}
                    {...item}
                    {...props}
                    style={{
                      ...style,
                      zIndex: stackingOrder,
                    }}
                  />
                )
            )}
          </>
        )}
      </Stack>
    );
  }
);

export { Tooltip };
