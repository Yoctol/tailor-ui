import PropTypes from 'prop-types';
import React from 'react';

import injectGlobalCss from '../injectGlobalCss';

import ThemeProvider from './ThemeProvider';

const DoczWrapper = ({ children }) => {
  injectGlobalCss();
  return <ThemeProvider theme="blue">{children}</ThemeProvider>;
};

DoczWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoczWrapper;
