import React, { SFC } from 'react';

import styled, { keyframes } from 'utils/styled-components';

import Flex from '../Grid/Flex';
import Icon from '../Icon';

const textAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const SpinText = styled.div`
  margin-top: 5px;
  color: ${p => p.theme.colors.primaryDark};
  animation: 2s ${textAnimation} ease;
  animation-iteration-count: infinite;
`;

export interface SpinProps {
  /**
   * Customize description content when Spin has children
   */
  text?: string;
}

const Spin: SFC<SpinProps> = ({ text = 'Loading...' }) => (
  <Flex
    flexDirection="column"
    height="100%"
    width="100%"
    alignItems="center"
    justifyContent="center"
  >
    <Icon type="loading" size="40" />
    <SpinText>{text}</SpinText>
  </Flex>
);

export default Spin;
