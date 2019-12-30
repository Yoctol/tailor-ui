import React, { FC, MouseEventHandler } from 'react';
import { MdClose } from 'react-icons/md';

import { Button } from '../Button';

import { CloseButtonWrapper } from './styles';

export interface CloseButtonProps {
  onCancel?: MouseEventHandler;
}

const CloseButton: FC<CloseButtonProps> = ({ onCancel }) => (
  <CloseButtonWrapper>
    <Button variant="normal" rounded icon={MdClose} onClick={onCancel} />
  </CloseButtonWrapper>
);

export default CloseButton;
