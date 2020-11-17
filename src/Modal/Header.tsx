import React, { FC, MouseEventHandler, ReactNode } from 'react';

import { Flex } from '../Layout';
import { Heading } from '../Typography';
import { Icon } from '../Icon';
import { StatusType } from '../types';

import CloseButton from './CloseButton';

export interface ModalHeaderProps {
  title?: ReactNode;
  status?: StatusType | null;
  closable?: boolean;
  onCancel: MouseEventHandler;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  status,
  onCancel,
  closable,
}) => (
  <Flex flex="none" alignItems="center" mb="3" pt="24px" px="4">
    {status && (
      <Flex mr="2">
        <Icon
          type={status}
          fill={status === 'info' ? 'primary' : status}
          size="32"
          mr="2"
        />
      </Flex>
    )}
    <Flex flex="auto">
      <Heading.H3>{title}</Heading.H3>
    </Flex>
    {closable && <CloseButton onCancel={onCancel} />}
  </Flex>
);

export default ModalHeader;
