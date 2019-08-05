import React, { FC, MouseEvent, ReactNode, memo } from 'react';

import { Button } from '../Button';
import { Flex } from '../Layout';
import { Icon } from '../Icon';
import { Popover, PopoverProps } from '../Popover';
import { StatusType } from '../types';
import { useLocale } from '../locale';

interface PopconfirmContentProps extends PopoverProps {
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
  type?: StatusType;
  /**
   * callback of cancel
   */
  onCancel?: (event: MouseEvent) => void;
  /**
   * callback of confirmation
   */
  onConfirm?: (event: MouseEvent) => void;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
}

const PopconfirmContent = memo<
  PopconfirmContentProps & {
    hideTooltip: () => void;
  }
>(function PopconfirmContent({
  type = 'warning',
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  hideTooltip,
}) {
  const { locale } = useLocale();

  return (
    <>
      <Flex alignItems="center">
        <Icon type={type} fill={type} size="20" mr="2" />
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
    </>
  );
});

const Popconfirm: FC<PopconfirmContentProps> = ({
  type,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  ...props
}) => (
  <Popover
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
    {...props}
  />
);

Popconfirm.defaultProps = {
  content: '',
  onConfirm: () => {},
  onCancel: () => {},
};

export { Popconfirm };
