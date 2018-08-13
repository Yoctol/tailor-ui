import PropTypes from 'prop-types';
import React from 'react';

import Box from '../Grid/Box';
import Button from '../Button';
import Flex from '../Grid/Flex';

const Footer = ({
  handleClose,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}) => (
  <Flex>
    <Box ml="auto">
      {cancelText && (
        <Button
          light
          onClick={event => {
            handleClose();
            onCancel(event);
          }}
        >
          {cancelText}
        </Button>
      )}
      {confirmText && (
        <Button
          ml="2"
          onClick={event => {
            handleClose();
            onConfirm(event);
          }}
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
  handleClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  cancelText: null,
};

export default Footer;
