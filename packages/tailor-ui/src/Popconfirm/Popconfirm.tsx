import React, {
  FunctionComponent,
  MouseEvent,
  ReactNode,
  memo,
  useContext,
} from 'react';

import Button from '../Button';
import Popover, { PopoverProps } from '../Popover';
import getTypeIcon from '../utils/getTypeIcon';
import { Flex } from '../Layout';
import { LocaleContext } from '../UIProvider';

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
  type?: 'info' | 'success' | 'warning' | 'error';
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

const PopconfirmContent: FunctionComponent<
  PopconfirmContentProps & {
    hideTooltip: () => void;
  }
> = memo(function PopconfirmContent({
  type,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  hideTooltip,
}) {
  const { locale } = useContext(LocaleContext);

  const icon = getTypeIcon(type);

  return (
    <>
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

const Popconfirm: FunctionComponent<PopconfirmContentProps> = ({
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
  type: 'warning',
  onConfirm: () => {},
  onCancel: () => {},
};

export default Popconfirm;
