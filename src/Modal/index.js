import PropTypes from 'prop-types';
import React from 'react';

import Box from '../Grid/Box';
import Button from '../Button';
import Flex from '../Grid/Flex';
import Heading from '../Heading';

import BaseModal from './BaseModal';
import CloseButton from './CloseButton';

const Modal = ({
  title,
  children,
  handleClose,
  footer,
  closable,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  ...props
}) => {
  const content = (
    <>
      <Flex p="4" borderBottom="default" borderColor="gray.8">
        <Box flex="auto">
          <Heading.h3>{title}</Heading.h3>
        </Box>
        {closable && <CloseButton handleClose={handleClose} />}
      </Flex>

      <Flex flexDirection="column" p="4">
        {children}
      </Flex>

      <Flex p="2" borderTop="default" borderColor="gray.8">
        {footer === 'default' ? (
          <>
            <Button
              light
              ml="auto"
              onClick={event => {
                handleClose();
                onCancel(event);
              }}
            >
              {cancelText}
            </Button>
            <Button
              ml="2"
              onClick={event => {
                handleClose();
                onConfirm(event);
              }}
            >
              {confirmText}
            </Button>
          </>
        ) : (
          footer
        )}
      </Flex>
    </>
  );

  return <BaseModal content={content} handleClose={handleClose} {...props} />;
};

Modal.propTypes = {
  /**
   * text of the Cancel button
   */
  cancelText: PropTypes.string,
  /**
   * The children of modal content
   */
  children: PropTypes.node,
  /**
   * Whether a close (x) button is visible on top right of the modal dialog or not
   */
  closable: PropTypes.bool,
  /**
   * text of the Confirm button
   */
  confirmText: PropTypes.string,
  /**
   * Footer content, set as `footer={null}` when you don't need default buttons
   */
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * The function will be triggerd when user click outside of the modal or press ESC key
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * The modal dialog's title
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Whether the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Width of modal
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * callback of cancel
   */
  onCancel: PropTypes.func,
  /**
   * callback of confirmation
   */
  onConfirm: PropTypes.func,
};

Modal.defaultProps = {
  closable: false,
  children: null,
  width: 416,
  footer: 'default',
  title: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: () => {},
};

export default Modal;
