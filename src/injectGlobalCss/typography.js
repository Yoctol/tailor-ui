import { css } from 'styled-components';
import { lighten } from 'polished';

import theme from '../theme';
import { labelBase, labelVariant } from '../utils/label';

export default css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: inherit;
    line-height: 1.2;
    font-weight: 400;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.4rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 0.8rem;
  }

  p {
    margin: 0 0 ${theme.lineHeight};
  }

  a,
  ins,
  u {
    text-decoration-skip: ink edges;
  }

  abbr[title] {
    border-bottom: ${theme.borders.default} dotted;
    cursor: help;
    text-decoration: none;
  }

  kbd {
    font-size: ${theme.fontSizes.sm};
    ${labelBase} ${labelVariant(theme.colors.light, theme.colors.dark)};
  }

  mark {
    padding: 0.05rem;
    border-radius: ${theme.radii[1]};
    ${labelVariant(theme.colors.bodyFont, theme.colors.highlight)};
  }

  blockquote {
    margin-left: 0;
    padding: ${theme.space[2]} ${theme.space[4]};
    border-left: ${theme.borders.lg} ${theme.colors.border};

    p:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin: ${theme.space[4]} 0 ${theme.space[4]} ${theme.space[4]};
    padding: 0;

    ul,
    ol {
      margin: ${theme.space[4]} 0 ${theme.space[4]} ${theme.space[4]};
    }

    li {
      margin-top: ${theme.space[2]};
    }
  }

  /* stylelint-disable no-descending-specificity */
  ul {
    list-style: disc inside;

    ul {
      list-style-type: circle;
    }
  }

  ol {
    list-style: decimal inside;

    ol {
      list-style-type: lower-alpha;
    }
  }
  /* stylelint-enable */

  dl {
    dt {
      font-weight: bold;
    }

    dd {
      margin: ${theme.space[2]} 0 ${theme.space[4]} 0;
    }
  }

  code {
    font-size: 85%;
    ${labelBase} ${labelVariant(
      theme.colors.code,
      lighten(0.33, theme.colors.code)
    )};
  }
`;