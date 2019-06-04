import { AutoSizeInput, Select, Tabs, Tag } from '..';

describe('index', () => {
  it('should export all components', () => {
    expect(AutoSizeInput).toBeDefined();
    expect(Select).toBeDefined();
    expect(Tabs).toBeDefined();
    expect(Tag).toBeDefined();
  });
});
