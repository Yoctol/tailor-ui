import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import Button from '../Button';

const CloseButtonWrapper = styled.div`
  background: transparent;
  transform: rotate(0deg);
  transition: all 0.2s ease-in;

  :hover {
    transform: rotate(90deg);
  }
`;

export interface ICloseButtonProps {
  onCancel?: () => void;
}

const CloseButton: FunctionComponent<ICloseButtonProps> = ({ onCancel }) => (
  <CloseButtonWrapper>
    <Button text rounded icon={MdClose} onClick={onCancel} />
  </CloseButtonWrapper>
);

export default CloseButton;
