import { ReactNode, useRef } from 'react';

const useTargetRef = ({ children }: { children?: ReactNode }) => {
  const targetRefFromSelf = useRef(null);

  const targetRef =
    children && (children as any).ref
      ? (children as any).ref
      : targetRefFromSelf;

  return targetRef;
};

export { useTargetRef };
