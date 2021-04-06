import React, { FC, MouseEventHandler, ReactNode } from 'react';

import { Flex } from '../Layout';
import { Heading } from '../Typography';
import { Icon } from '../Icon';
import { StatusType } from '../types';

import CloseButton from './CloseButton';

export interface ModalHeaderProps {
  header?: ReactNode;
  title?: ReactNode;
  status?: StatusType | null;
  closable?: boolean;
  onCancel: MouseEventHandler;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  header,
  title,
  status,
  onCancel,
  closable,
}) => {
  if (header) {
    return (
      <Flex flex="none" mb="3" position="relative">
        {header}
        {closable && <CloseButton onCancel={onCancel} />}
      </Flex>
    );
  }

  return (
    <Flex flex="none" mb="3" pt="24px" px="4" position="relative">
      {status && (
        <Icon
          type={status}
          fill={status === 'info' ? 'primary' : status}
          size="32"
          mr="3"
        />
      )}
      <Heading.H3 lineHeight="32px">{title}</Heading.H3>
      {closable && <CloseButton onCancel={onCancel} />}
    </Flex>
  );
};

export default ModalHeader;
