import React, {
  CSSProperties,
  FC,
  MouseEventHandler,
  ReactNode,
  isValidElement,
} from 'react';

import { Box, Flex } from '../Layout';
import { Button, ButtonProps } from '../Button';
import { useLocale } from '../locale';

export interface FooterButtonsProps {
  closable?: boolean;
  cancelText?: ReactNode;
  confirmText?: ReactNode;
  onConfirm?: MouseEventHandler;
  onCancel?: MouseEventHandler;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

export const FooterButtons: FC<FooterButtonsProps> = ({
  closable,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => {
  const { locale } = useLocale();

  return (
    <Flex width="100%">
      <Box ml="auto">
        {closable && (
          <Button variant="normal" onClick={onCancel} {...cancelButtonProps}>
            {cancelText || locale.Modal.cancelText}
          </Button>
        )}
        <Button
          ml="3"
          variant="primary"
          onClick={onConfirm}
          {...confirmButtonProps}
        >
          {confirmText || locale.Modal.confirmText}
        </Button>
      </Box>
    </Flex>
  );
};

export interface ModalFooterProps extends FooterButtonsProps {
  footer?: ReactNode;
  style?: CSSProperties;
}

const ModalFooter: FC<ModalFooterProps> = ({
  footer,
  closable,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
  ...props
}) => {
  return footer === null ? null : (
    <Flex
      flex="none"
      alignItems="center"
      px="4"
      py="3"
      borderTop="base"
      borderColor="gray300"
      {...props}
    >
      {isValidElement(footer) ? (
        footer
      ) : (
        <FooterButtons
          closable={closable}
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmButtonProps={confirmButtonProps}
          cancelButtonProps={cancelButtonProps}
        />
      )}
    </Flex>
  );
};

export default ModalFooter;
