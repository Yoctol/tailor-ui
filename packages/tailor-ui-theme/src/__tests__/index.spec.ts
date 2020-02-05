import { fontStyle, globalStyle, theme } from '..';

describe('index', () => {
  it('should export correctly', () => {
    expect(theme).toBeDefined();
    expect(globalStyle).toBeDefined();
    expect(fontStyle).toBeDefined();
  });
});
