import React, { SFC } from 'react';
import { MdClose } from 'react-icons/md';

import styled from 'utils/styled-components';

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
    <Button text rounded icon={MdClose} onClick={onCancel} />
  </CloseButtonWrapper>
);

export default CloseButton;
