import PropTypes from 'prop-types';
import React from 'react';

import Box from '../Grid/Box';
import Button from '../Button';
import Flex from '../Grid/Flex';

const Footer = ({
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

Footer.propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  cancelText: null,
};

export default Footer;
