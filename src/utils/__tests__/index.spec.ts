import { mergeEventProps, preventBodyScroll } from '..';

describe('index', () => {
  it('should export all components', () => {
    expect(mergeEventProps).toBeDefined();
    expect(preventBodyScroll).toBeDefined();
  });
});
