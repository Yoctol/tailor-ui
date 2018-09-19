import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

export { SpaceProps };

const Space = styled<SpaceProps, 'div'>('div')`
  ${space};
`;

export default Space;
