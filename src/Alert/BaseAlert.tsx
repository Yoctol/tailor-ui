import CloseIcon from 'react-icons/lib/md/close';
import React, { SFC } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { space, SpaceProps } from 'styled-system';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Icon from '../Icon';
import getTypeIcon from '../utils/getTypeIcon';

export interface AlertTypes extends SpaceProps {
  type: 'info' | 'success' | 'warning' | 'error';
}

const StyledAlert = styled<AlertTypes, 'div'>('div')`
  display: flex;
  align-items: center;
  margin-bottom: ${p => p.theme.space[3]};
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[3]};
  overflow-y: hidden;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.borderRadius.base};
  border-color: ${p => p.theme.colors[p.type]};
  background-color: ${p => rgba(p.theme.colors[p.type], 0.1)};
  font-size: ${p => p.theme.fontSizes.sm};
  transform-origin: top;

  ${space};
`;

export interface BaseAlertProps extends AlertTypes {
  closable?: boolean;
  message: JSX.Element;
  onClose: () => void;
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
