import styled from 'styled-components';
import { space } from 'styled-system';

const Space = styled.div`
  ${space};
`;

Space.propTypes = {
  ...space.propTypes,
};

export default Space;
