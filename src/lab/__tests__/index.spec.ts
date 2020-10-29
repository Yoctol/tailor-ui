import { Tabs, Tooltip } from '..';

describe('index', () => {
  it('should export all components', () => {
    expect(Tabs).toBeDefined();
    expect(Tooltip).toBeDefined();
  });
});
