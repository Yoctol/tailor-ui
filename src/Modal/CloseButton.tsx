import Close from 'react-icons/lib/md/close';
import React, { SFC } from 'react';
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

export interface CloseButtonProps {
  onCancel?: () => void;
}

const CloseButton: SFC<CloseButtonProps> = ({ onCancel }) => (
  <CloseButtonWrapper>
    <Button text rounded icon={Close} onClick={onCancel} />
  </CloseButtonWrapper>
);

export default CloseButton;
