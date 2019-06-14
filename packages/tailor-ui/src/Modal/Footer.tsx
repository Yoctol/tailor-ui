import React, { FunctionComponent } from 'react';

import { Box, Flex } from '../Layout';
import { Button, ButtonProps } from '../Button';

export interface FooterProps {
  closable?: boolean;
  cancelText?: string | null;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const Footer: FunctionComponent<FooterProps> = ({
  closable = true,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => (
  <Flex width="100%">
    <Box ml="auto">
      {closable && (
        <Button variant="normal" onClick={onCancel} {...cancelButtonProps}>
          {cancelText}
        </Button>
      )}
      <Button
        ml="3"
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
