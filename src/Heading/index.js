import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { color, space, themeGet } from 'styled-system';
import { ifProp } from 'styled-tools';
import { rem } from 'polished';

const HeadingBase = styled.p`
  margin: 0;
  color: ${themeGet('colors.primaryDark')};
  font-weight: 500;
  line-height: 1.5;

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

const h1 = styled(HeadingBase.withComponent('h1'))`
  font-size: ${rem('28px')};
`;
h1.displayName = 'Heading.h1';

const h2 = styled(HeadingBase.withComponent('h2'))`
  font-size: ${rem('24px')};
`;
h2.displayName = 'Heading.h2';

const h3 = styled(HeadingBase.withComponent('h3'))`
  font-size: ${rem('18px')};
`;
h3.displayName = 'Heading.h3';

const h4 = styled(HeadingBase.withComponent('h4'))`
  font-size: ${rem('16px')};
`;
h4.displayName = 'Heading.h4';

const h5 = styled(HeadingBase.withComponent('h5'))`
  font-size: ${rem('14px')};
`;
h5.displayName = 'Heading.h5';

const h6 = styled(HeadingBase.withComponent('h6'))`
  font-size: ${rem('12px')};
`;
h6.displayName = 'Heading.h6';

const Heading = (...props) => <HeadingBase {...props} />;

Heading.propTypes = {
  gray: PropTypes.bool,
  grayHint: PropTypes.bool,
  grayLight: PropTypes.bool,
  white: PropTypes.bool,
  ...space.propTypes,
  ...color.propTypes,
};

Heading.defaultProps = {
  gray: false,
  grayLight: false,
  grayHint: false,
  white: false,
};

Heading.h1 = h1;
Heading.h2 = h2;
Heading.h3 = h3;
Heading.h4 = h4;
Heading.h5 = h5;
Heading.h6 = h6;

export default Heading;
