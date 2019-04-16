import React, { FunctionComponent } from 'react';

import Box from '../Grid/Box';
import Button, { ButtonProps } from '../Button';
import Flex from '../Grid/Flex';

export interface FooterProps {
  cancelable?: boolean;
  cancelText?: string | null;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const Footer: FunctionComponent<FooterProps> = ({
  cancelable = true,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => (
  <Flex width="100%">
    <Box ml="auto">
      {cancelable && (
        <Button variant="normal" onClick={onCancel} {...cancelButtonProps}>
          {cancelText}
        </Button>
      )}
      <Button
        ml="4"
        variant="primary"
        onClick={onConfirm}
        {...confirmButtonProps}
      >
        {confirmText}
      </Button>
    </Box>
  </Flex>
);

export default Footer;
