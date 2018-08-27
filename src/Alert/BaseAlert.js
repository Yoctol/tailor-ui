import CloseIcon from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { space, themeGet } from 'styled-system';

import Box from '../Grid/Box';
import Icon from '../Icon';
import getTypeIcon from '../utils/getTypeIcon';

const StyledAlert = styled.div`
  display: flex;
  overflow-y: hidden;
  border: ${themeGet('borders.default')};
  border-radius: ${themeGet('radii.1')};
  border-color: ${p => themeGet(`colors.${p.type}`)(p)};
  background-color: ${p => rgba(themeGet(`colors.${p.type}`)(p), 0.1)};
  font-size: ${themeGet('fontSizes.sm')};
  transform-origin: top;

  ${space};
`;

StyledAlert.defaultProps = {
  px: 4,
  py: 2,
  mb: 4,
};

const BaseAlert = ({ message, type, closable, onClose, ...props }) => (
  <StyledAlert type={type} {...props}>
    <Box flex="none">{getTypeIcon(type)}</Box>
    <Box flex="auto">{message}</Box>
    {closable && (
      <Box flex="none">
        <Icon size="16" cursor="pointer" type={CloseIcon} onClick={onClose} />
      </Box>
    )}
  </StyledAlert>
);

BaseAlert.propTypes = {
  closable: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

BaseAlert.defaultProps = {
  onClose: () => {},
};

export default BaseAlert;
