import styled, { StyledComponent } from 'styled-components';
import { SpaceProps, space } from 'styled-system';

const Space: StyledComponent<'div', any, SpaceProps> = styled.div`
  ${space};
`;

export default Space;
