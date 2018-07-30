import styled from 'styled-components';
import {
  alignItems,
  flexDirection,
  flexWrap,
  justifyContent,
} from 'styled-system';

import Box from './Box';

const Flex = styled(Box)`
  display: flex;

  ${alignItems};
  ${flexDirection};
  ${justifyContent};
  ${flexWrap};
`;

Flex.propTypes = {
  ...Box.propTypes,
  ...alignItems.propTypes,
  ...flexDirection.propTypes,
  ...justifyContent.propTypes,
  ...flexWrap.propTypes,
};

export default Flex;
