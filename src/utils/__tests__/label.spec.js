import { css } from 'styled-components';

import theme from '../../theme';
import { labelBase, labelVariant } from '../label';

describe('label', () => {
  it('should export labelBase and labelVariant', () => {
    expect(labelBase).toBeDefined();
    expect(labelVariant).toBeDefined();
  });

  describe('labelVariant', () => {
    it('should work with default value', () => {
      expect(labelVariant()).toEqual(css`
        background: ${theme.colors.primary};
        color: ${theme.colors.light};
      `);
    });

    it('should work with passing color and bg', () => {
      const color = '#fff';
      const bg = '#eee';

      expect(labelVariant(color, bg)).toEqual(css`
        background: ${bg};
        color: ${color};
      `);
    });
  });
});
