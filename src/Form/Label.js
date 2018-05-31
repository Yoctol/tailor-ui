import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { switchProp } from 'styled-tools';

const Label = styled.label`
  display: block;
  line-height: ${themeGet('lineHeight')};

  ${switchProp('size', {
    sm: css`
      padding: calc(
          ${themeGet('space.paddingYSm')} + ${themeGet('borders.defaultRem')}
        )
        0;
      font-size: ${themeGet('fontSizes.sm')};
    `,
    m: css`
      padding: calc(
          ${themeGet('space.paddingY')} + ${themeGet('borders.defaultRem')}
        )
        0;
      font-size: ${themeGet('fontSizes.default')};
    `,
    lg: css`
      padding: calc(
          ${themeGet('space.paddingYLg')} + ${themeGet('borders.defaultRem')}
        )
        0;
      font-size: ${themeGet('fontSizes.lg')};
    `,
  })};
`;

Label.defaultProps = {
  size: 'm',
};

export default Label;
