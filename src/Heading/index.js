import styled, { css } from 'styled-components';
import { themeGet, space, color } from 'styled-system';
import { ifProp } from 'styled-tools';

const Heading = styled.p`
  margin: 0;
  color: ${themeGet('colors.primaryDark')};
  font-weight: 500;
  line-height: 1;

  ${ifProp(
    'gray',
    css`
      color: ${themeGet('colors.gray.2')};
    `
  )}

  ${ifProp(
    'grayLight',
    css`
      color: ${themeGet('colors.gray.4')};
    `
  )}

  ${ifProp(
    'grayHint',
    css`
      color: ${themeGet('colors.gray.5')};
    `
  )}

  ${ifProp(
    'white',
    css`
      color: ${themeGet('colors.light')};
    `
  )}

  ${space};
  ${color}
`;

Heading.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
};

const h1 = styled(Heading.withComponent('h1'))`
  font-size: 1.4rem;
`;
h1.displayName = 'Heading.h1';

const h2 = styled(Heading.withComponent('h2'))`
  font-size: 1.25rem;
`;
h2.displayName = 'Heading.h2';

const h3 = styled(Heading.withComponent('h3'))`
  font-size: 0.9rem;
`;
h3.displayName = 'Heading.h3';

const h4 = styled(Heading.withComponent('h4'))`
  font-size: 0.8rem;
`;
h4.displayName = 'Heading.h4';

const h5 = styled(Heading.withComponent('h5'))`
  font-size: 0.7rem;
`;
h5.displayName = 'Heading.h5';

const h6 = styled(Heading.withComponent('h6'))`
  font-size: 0.6rem;
`;
h6.displayName = 'Heading.h6';

Heading.h1 = h1;
Heading.h2 = h2;
Heading.h3 = h3;
Heading.h4 = h4;
Heading.h5 = h5;
Heading.h6 = h6;

export default Heading;
