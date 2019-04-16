import React, {
  FunctionComponent,
  MouseEvent,
  ReactNode,
  useContext,
} from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Flex from '../Grid/Flex';
import Space from '../Grid/Space';
import Tooltip, { ITooltipProps } from '../Tooltip';
import getTypeIcon from '../utils/getTypeIcon';
import { ArrowComponent, ContentComponent } from '../Popover';
import { LocaleContext } from '../UIProvider';

const components = {
  ArrowComponent,
  ContentComponent,
};

interface PopconfirmContentProps {
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
}

const PopconfirmContent: FunctionComponent<
  PopconfirmContentProps & {
    hideTooltip: () => void;
  }
> = ({
  type,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  hideTooltip,
}) => {
  const { locale } = useContext(LocaleContext);
  const icon = getTypeIcon(type);

  return (
    <StyledContent>
      <Flex alignItems="center">
        {icon}
        {content}
      </Flex>
      <Flex mt="4">
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
          {cancelText || locale.Popconfirm.cancelText}
        </Button>
        <Button
          ml="2"
          size="sm"
          variant="primary"
          onClick={(event: MouseEvent) => {
            hideTooltip();
            if (onConfirm) {
              onConfirm(event);
            }
          }}
        >
          {confirmText || locale.Popconfirm.confirmText}
        </Button>
      </Flex>
    </StyledContent>
  );
};

const StyledContent = styled(Space)`
  padding: ${p => p.theme.space[2]};
  word-break: break-all;
  white-space: nowrap;
`;

export type PopconfirmProps = ITooltipProps & PopconfirmContentProps;

const Popconfirm: FunctionComponent<PopconfirmProps> = ({
  type,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  ...props
}) => (
  <Tooltip
    components={components}
    content={hideTooltip => (
      <PopconfirmContent
        type={type}
        content={content}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
        hideTooltip={hideTooltip}
      />
    )}
    trigger="click"
    {...props}
  />
);

Popconfirm.defaultProps = {
  content: '',
  type: 'warning',
  onConfirm: () => {},
  onCancel: () => {},
};

export default Popconfirm;
