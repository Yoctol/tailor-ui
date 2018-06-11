import styled, { css } from 'styled-components';
import { themeGet, space } from 'styled-system';
import { ifProp } from 'styled-tools';

const BaseHeading = styled.p`
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
`;

BaseHeading.propTypes = {
  ...space.propTypes,
};

const h1 = styled(BaseHeading.withComponent('h1'))`
  font-size: 1.4rem;
`;

const h2 = styled(BaseHeading.withComponent('h2'))`
  font-size: 1.25rem;
`;

const h3 = styled(BaseHeading.withComponent('h3'))`
  font-size: 0.9rem;
`;

const h4 = styled(BaseHeading.withComponent('h4'))`
  font-size: 0.8rem;
`;

const h5 = styled(BaseHeading.withComponent('h5'))`
  font-size: 0.7rem;
`;

const h6 = styled(BaseHeading.withComponent('h6'))`
  font-size: 0.6rem;
`;

const Heading = BaseHeading;

Heading.h1 = h1;
Heading.h2 = h2;
Heading.h3 = h3;
Heading.h4 = h4;
Heading.h5 = h5;
Heading.h6 = h6;

export default Heading;
