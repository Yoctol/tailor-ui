import Close from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const CloseButtonWrapper = styled.div`
  background: transparent;
  transform: rotate(0deg);
  transition: all 0.2s ease-in;

  :hover {
    transform: rotate(90deg);
  }
`;

const CloseButton = ({ onCancel }) => (
  <CloseButtonWrapper>
    <Button text rounded icon={Close} onClick={onCancel} />
  </CloseButtonWrapper>
);

CloseButton.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default CloseButton;
