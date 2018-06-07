import styled from 'styled-components';
import createPropsTransform from 'react-props-classnames';
import { themeGet, space } from 'styled-system';

const propsTransform = createPropsTransform({
  prefix: 'heading',
  props: ['gray', 'grayLight', 'grayHint', 'white'],
});

const BaseHeading = styled.p`
  margin: 0;
  color: ${themeGet('colors.primaryDark')};
  font-weight: 500;
  line-height: 1;

  &.heading-gray {
    color: ${themeGet('colors.gray.2')};
  }

  &.heading-grayLight {
    color: ${themeGet('colors.gray.4')};
  }

  &.heading-grayHint {
    color: ${themeGet('colors.gray.5')};
  }

  &.heading-white {
    color: ${themeGet('colors.light')};
  }

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

const Heading = propsTransform(BaseHeading);

Heading.h1 = propsTransform(h1);
Heading.h2 = propsTransform(h2);
Heading.h3 = propsTransform(h3);
Heading.h4 = propsTransform(h4);
Heading.h5 = propsTransform(h5);
Heading.h6 = propsTransform(h6);

export default Heading;
