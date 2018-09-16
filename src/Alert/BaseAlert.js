import CloseIcon from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { borderRadius, space, themeGet } from 'styled-system';
import { rgba } from 'polished';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Icon from '../Icon';
import getTypeIcon from '../utils/getTypeIcon';

const StyledAlert = styled.div`
  display: flex;
  align-items: center;
  overflow-y: hidden;
  border: ${themeGet('borders.base')};
  border-color: ${p => themeGet(`colors.${p.type}`)(p)};
  background-color: ${p => rgba(themeGet(`colors.${p.type}`)(p), 0.1)};
  font-size: ${themeGet('fontSizes.sm')};
  transform-origin: top;

  ${space};
  ${borderRadius};
`;

StyledAlert.defaultProps = {
  px: 3,
  py: 2,
  mb: 3,
  borderRadius: 'base',
};

const BaseAlert = ({ message, type, closable, onClose, ...props }) => (
  <StyledAlert type={type} {...props}>
    <Flex flex="none">{getTypeIcon(type)}</Flex>
    <Box flex="auto">{message}</Box>
    {closable && (
      <Flex flex="none">
        <Icon size="16" cursor="pointer" type={CloseIcon} onClick={onClose} />
      </Flex>
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
