import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import Button from '../Button';
import Flex from '../Grid/Flex';
import Space from '../Grid/Space';
import Tooltip from '../Tooltip';
import getTypeIcon from '../utils/getTypeIcon';
import { ArrowComponent, ContentComponent } from '../Popover';

const components = {
  ArrowComponent,
  ContentComponent,
};

const StyledContent = styled(Space)`
  padding: ${themeGet('space.2')};
  word-break: break-all;
  white-space: nowrap;
`;

const Popconfirm = ({
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type,
  content,
  ...props
}) => {
  const icon = getTypeIcon(type);
  const renderContent = hideTooltip => (
    <StyledContent>
      <Flex alignItems="center">
        {icon}
        {content}
      </Flex>
      <Flex mt="3">
        <Button
          ml="auto"
          size="sm"
          onClick={event => {
            hideTooltip();
            onCancel(event);
          }}
        >
          {cancelText}
        </Button>
        <Button
          ml="2"
          size="sm"
          type="primary"
          onClick={event => {
            hideTooltip();
            onConfirm(event);
          }}
        >
          {confirmText}
        </Button>
      </Flex>
    </StyledContent>
  );

  return (
    <Tooltip
      components={components}
      content={renderContent}
      trigger="click"
      {...props}
    />
  );
};

Popconfirm.propTypes = {
  /**
   * text of the Cancel button
   */
  cancelText: PropTypes.string,
  /**
   * text of the Confirm button
   */
  confirmText: PropTypes.string,
  /**
   * content of the confirmation box
   */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * customize icon of confirmation
   */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /**
   * callback of cancel
   */
  onCancel: PropTypes.func,
  /**
   * callback of confirmation
   */
  onConfirm: PropTypes.func,
};

Popconfirm.defaultProps = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  content: '',
  type: 'warning',
  onConfirm: () => {},
  onCancel: () => {},
};

export default Popconfirm;
