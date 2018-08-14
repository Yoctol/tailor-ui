import PropTypes from 'prop-types';
import React from 'react';

import Box from '../Grid/Box';
import Button from '../Button';
import Flex from '../Grid/Flex';

const Footer = ({ cancelText, confirmText, onCancel, onConfirm }) => (
  <Flex>
    <Box ml="auto">
      {cancelText && <Button onClick={onCancel}>{cancelText}</Button>}
      {confirmText && (
        <Button ml="2" type="primary" onClick={onConfirm}>
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
