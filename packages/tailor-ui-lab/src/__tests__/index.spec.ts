import { Mention, Popconfirm, Popover, Tabs, Tooltip } from '..';

describe('index', () => {
  it('should export all components', () => {
    expect(Mention).toBeDefined();
    expect(Popconfirm).toBeDefined();
    expect(Popover).toBeDefined();
    expect(Tabs).toBeDefined();
    expect(Tooltip).toBeDefined();
  });
});
