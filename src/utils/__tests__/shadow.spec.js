import { css } from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from 'styled-system';

import { controlShadow, shadowVariant } from '../shadow';
import { dark, primary } from '../../theme/colors';

jest.mock('styled-system', () => ({
  themeGet: jest.fn(),
}));

describe('shadow', () => {
  it('should export controlShadow and shadowVariant', () => {
    expect(controlShadow).toBeDefined();
    expect(shadowVariant).toBeDefined();
  });

  describe('controlShadow', () => {
    it('should work', () => {
      const offset = 0.1;
      const shadow = shadowVariant(offset);

      expect(shadow).toEqual(css`
        box-shadow: 0 ${offset}rem ${(offset + 0.1) * 2}rem ${rgba(dark, 0.2)};
      `);
    });

    it('should work with default color', () => {
      const shadow = controlShadow();

      expect(shadow).toEqual(css`
        box-shadow: 0 0 0 0.1rem ${rgba(primary, 0.2)};
      `);
    });

    it('should work with passing color', () => {
      const shadow = controlShadow('#fff');

      expect(shadow).toEqual(css`
        box-shadow: 0 0 0 0.1rem ${rgba('#fff', 0.2)};
      `);
    });

    it('should work with passing handler', () => {
      themeGet.mockImplementation(color => ({ theme }) => theme[color]);
      const boxShadowFunction = controlShadow(themeGet('colors.error'));
      const shadow = boxShadowFunction({
        theme: { 'colors.error': '#da3333' },
      });

      expect(shadow).toEqual(css`
        box-shadow: 0 0 0 0.1rem ${rgba('#da3333', 0.2)};
      `);
    });
  });
});
