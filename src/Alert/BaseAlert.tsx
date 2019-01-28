import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { SpaceProps, space } from 'styled-system';
import { omit } from 'ramda';
import { rgba } from 'polished';

import tag from 'utils/CleanTag';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Icon from '../Icon';
import getTypeIcon, { Types } from '../utils/getTypeIcon';

export type IAlertTypes = SpaceProps & {
  type: Types;
};

const StyledAlert = styled(tag.div)<IAlertTypes>`
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

export interface IBaseAlertProps extends IAlertTypes {
  closable: boolean;
  message: ReactNode;
  type: Types;
  onClose?: () => void;
}

const BaseAlert: FunctionComponent<IBaseAlertProps> = ({
  message,
  type,
  closable,
  onClose,
  ...props
}) => (
  <StyledAlert type={type} {...omit(['onClosed'], props)}>
    <Flex flex="none">{getTypeIcon(type)}</Flex>
    <Box flex="auto">{message}</Box>
    {closable && (
      <Flex flex="none">
        <Icon size="16" cursor="pointer" type={MdClose} onClick={onClose} />
      </Flex>
    )}
  </StyledAlert>
);

export default BaseAlert;
