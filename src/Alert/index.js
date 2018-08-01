import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { space, themeGet } from 'styled-system';

import getTypeIcon from '../utils/getTypeIcon';

const StyledAlert = styled.div`
  display: flex;
  border: ${themeGet('borders.default')};
  border-radius: ${themeGet('radii.1')};
  border-color: ${p => themeGet(`colors.${p.type}`)(p)};

  ${space};
`;

StyledAlert.defaultProps = {
  px: 4,
  py: 2,
  mb: 4,
};

const Alert = ({ message, type, ...props }) => (
  <StyledAlert type={type} {...props}>
    {getTypeIcon(type)}
    {message}
  </StyledAlert>
);

Alert.propTypes = {
  /**
   * Content of Alert
   */
  message: PropTypes.string.isRequired,
  /**
   * Type of Alert styles
   */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  ...space.propTypes,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
