import CloseIcon from 'react-icons/lib/md/close';
import React, { ReactNode, SFC } from 'react';
import { SpaceProps, space } from 'styled-system';
import { rgba } from 'polished';

import styled from 'utils/styled-components';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Icon from '../Icon';
import getTypeIcon, { Types } from '../utils/getTypeIcon';

export interface AlertTypes extends SpaceProps {
  type: Types;
}

const StyledAlert = styled<AlertTypes, 'div'>('div')`
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

export interface BaseAlertProps extends SpaceProps {
  closable?: boolean;
  type?: Types;
  message: ReactNode;
  onClose?: () => void;
}

const BaseAlert: SFC<BaseAlertProps> = ({
  message,
  type = 'info',
  closable = false,
  onClose,
  ...props
}) => (
  <StyledAlert type={type} {...props}>
    <Flex flex="none">{getTypeIcon(type)}</Flex>
    <Box flex="auto">{message}</Box>
    {closable && (
      <Flex flex="none">
        <Icon size="16" cursor="pointer" type={CloseIcon} onClick={onClose} />
      </Flex>
    )}
  </StyledAlert>
);

export default BaseAlert;
