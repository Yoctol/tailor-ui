import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export { SpaceProps };

const Space = styled<SpaceProps, 'div'>('div')`
  ${space};
`;

export default Space;
