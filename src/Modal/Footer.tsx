import React, { SFC } from 'react';

import Box from '../Grid/Box';
import Button, { ButtonProps } from '../Button';
import Flex from '../Grid/Flex';

export interface IFooterProps {
  cancelText?: string | null;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const Footer: SFC<IFooterProps> = ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => (
  <Flex width="100%">
    <Box ml="auto">
      {cancelText !== null && (
        <Button onClick={onCancel} {...cancelButtonProps}>
          {cancelText}
        </Button>
      )}
      <Button ml="2" type="primary" onClick={onConfirm} {...confirmButtonProps}>
        {confirmText}
      </Button>
    </Box>
  </Flex>
);

export default Footer;
