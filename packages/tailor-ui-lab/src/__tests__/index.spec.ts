import { Mention, Menu } from '..';

describe('index', () => {
  it('should export all components', () => {
    expect(Mention).toBeDefined();
    expect(Menu).toBeDefined();
  });
});
