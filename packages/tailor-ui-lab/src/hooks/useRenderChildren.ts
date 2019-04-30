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
  ref,
  mergeProps,
}: {
  children: ReactNode;
  ref: RefObject<HTMLElement>;
  mergeProps: object;
}) =>
  useCallback(() => {
    if (children instanceof Function) {
      return children({
        ref,
        bind: (props: any) => mergeEventProps(props, mergeProps),
      });
    }

    if (!isValidElement<any>(children)) {
      return children;
    }

    return cloneElement(children, {
      ref,
      ...mergeEventProps(children.props, mergeProps),
    });
  }, [children, mergeProps, ref]);

export default useRenderChildren;
