import React, { SFC } from 'react';

import Box from '../Grid/Box';
import Button, { ButtonProps } from '../Button';
import Flex from '../Grid/Flex';

export interface FooterProps {
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const Footer: SFC<FooterProps> = ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => (
  <Flex>
    <Box ml="auto">
      {cancelText && (
        <Button onClick={onCancel} {...cancelButtonProps}>
          {cancelText}
        </Button>
      )}
      {confirmText && (
        <Button
          ml="2"
          type="primary"
          onClick={onConfirm}
          {...confirmButtonProps}
        >
          {confirmText}
        </Button>
      )}
    </Box>
  </Flex>
);

export default Footer;
