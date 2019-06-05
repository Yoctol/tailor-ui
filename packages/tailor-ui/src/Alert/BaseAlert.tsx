import React, { ReactNode, forwardRef } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { SpaceProps, space } from 'styled-system';
import { omit } from 'ramda';
import { rgba } from 'polished';

import { Box, Flex } from '../Layout';
import { Icon } from '../Icon';
import { StatusType } from '../types';

export type IAlertTypes = SpaceProps & {
  type: StatusType;
};

const StyledAlert = styled.div<IAlertTypes>`
  display: flex;
  align-items: center;
  margin-bottom: ${p => p.theme.space[3]};
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[3]};
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors[p.type]};
  background-color: ${p => rgba(p.theme.colors[p.type], 0.1)};
  font-size: ${p => p.theme.fontSizes.sm};
  transform-origin: top;

  ${space};
`;

export interface BaseAlertProps extends IAlertTypes {
  closable: boolean;
  message: ReactNode;
  type: StatusType;
  onClose?: () => void;
}

const BaseAlert = forwardRef<HTMLDivElement, BaseAlertProps>(function BaseAlert(
  { message, type, closable, onClose, ...props },
  ref
) {
  return (
    <StyledAlert type={type} ref={ref} {...omit(['onClosed'], props)}>
      <Flex flex="none">
        <Icon size="20" type={type} mr="2" fill={type} />
      </Flex>
      <Box flex="auto">{message}</Box>
      {closable && (
        <Flex flex="none">
          <Icon size="16" cursor="pointer" type={MdClose} onClick={onClose} />
        </Flex>
      )}
    </StyledAlert>
  );
});

export default BaseAlert;
