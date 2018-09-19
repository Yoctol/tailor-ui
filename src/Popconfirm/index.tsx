import React, { MouseEvent, ReactNode, SFC } from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import Button from '../Button';
import Flex from '../Grid/Flex';
import Space from '../Grid/Space';
import Tooltip, { TooltipProps } from '../Tooltip';
import getTypeIcon from '../utils/getTypeIcon';
import { ArrowComponent, ContentComponent } from '../Popover';

const components = {
  ArrowComponent,
  ContentComponent,
};

const StyledContent = styled(Space)`
  padding: ${themeGet('space.2')};
  word-break: break-all;
  white-space: nowrap;
`;

export type PopconfirmProps = TooltipProps & {
  /**
   * text of the Cancel button
   */
  cancelText?: string;
  /**
   * text of the Confirm button
   */
  confirmText?: string;
  /**
   * content of the confirmation box
   */
  content: ReactNode;
  /**
   * customize icon of confirmation
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * callback of cancel
   */
  onCancel?: (event: MouseEvent) => void;
  /**
   * callback of confirmation
   */
  onConfirm?: (event: MouseEvent) => void;
};

const Popconfirm: SFC<PopconfirmProps> = ({
  type = 'warning',
  content = '',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  ...props
}) => {
  const icon = getTypeIcon(type);
  const renderContent = (hideTooltip: () => void) => (
    <StyledContent>
      <Flex alignItems="center">
        {icon}
        {content}
      </Flex>
      <Flex mt="3">
        <Button
          ml="auto"
          size="sm"
          onClick={(event: MouseEvent) => {
            hideTooltip();
            if (onCancel) {
              onCancel(event);
            }
          }}
        >
          {cancelText}
        </Button>
        <Button
          ml="2"
          size="sm"
          type="primary"
          onClick={(event: MouseEvent) => {
            hideTooltip();
            if (onConfirm) {
              onConfirm(event);
            }
          }}
        >
          {confirmText}
        </Button>
      </Flex>
    </StyledContent>
  );

  return (
    <Tooltip
      components={components}
      content={renderContent}
      trigger="click"
      {...props}
    />
  );
};

Popconfirm.defaultProps = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  content: '',
  type: 'warning',
  onConfirm: () => {},
  onCancel: () => {},
};

export default Popconfirm;
