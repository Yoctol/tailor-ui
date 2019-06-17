import {
  ReactNode,
  RefObject,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react';

import { mergeEventProps } from '@tailor-ui/utils';

const useRenderChildren = ({
  children,
  targetRef,
  mergeProps,
}: {
  children?: ReactNode;
  targetRef: RefObject<HTMLElement>;
  mergeProps: object;
}) => {
  const renderChildren = useCallback(() => {
    if (children instanceof Function) {
      return children({
        ref: targetRef,
        bind: (props: object) => mergeEventProps(props, mergeProps),
      });
    }

    if (!isValidElement(children)) {
      return children;
    }

    return cloneElement(children, {
      ref: targetRef,
      ...mergeEventProps(children.props, mergeProps),
    });
  }, [children, mergeProps, targetRef]);

  return renderChildren;
};

export { useRenderChildren };