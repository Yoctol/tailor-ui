import {
  useClickOutside,
  useHoverTrigger,
  useKeydown,
  useMeasure,
  useOwnValue,
  usePreventBodyScroll,
  usePrevious,
  useRenderChildren,
  useTargetRef,
  useToggleTrigger,
} from '..';

describe('index', () => {
  it('should export all components', () => {
    expect(useClickOutside).toBeDefined();
    expect(useHoverTrigger).toBeDefined();
    expect(useKeydown).toBeDefined();
    expect(useMeasure).toBeDefined();
    expect(useOwnValue).toBeDefined();
    expect(usePreventBodyScroll).toBeDefined();
    expect(usePrevious).toBeDefined();
    expect(useRenderChildren).toBeDefined();
    expect(useTargetRef).toBeDefined();
    expect(useToggleTrigger).toBeDefined();
  });
});
