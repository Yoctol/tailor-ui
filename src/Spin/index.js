import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { themeGet } from 'styled-system';

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
  color: ${themeGet('primaryDark')};
  animation: 2s ${textAnimation} ease;
  animation-iteration-count: infinite;
`;

const Spin = ({ text }) => (
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

Spin.propTypes = {
  text: PropTypes.string,
};

Spin.defaultProps = {
  text: 'Loading...',
};

export default Spin;
