import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

const StyledSpace = styled.div`
  ${space};
`;

const Space = ({ children, ref, ...props }) => (
  <StyledSpace innerRef={ref} {...props}>
    {children}
  </StyledSpace>
);

Space.propTypes = {
  ...space.propTypes,
};

export default Space;
