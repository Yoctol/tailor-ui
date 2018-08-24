import PropTypes from 'prop-types';
import React from 'react';

import injectGlobalCss from '../injectGlobalCss';

import ThemeProvider from './ThemeProvider';

injectGlobalCss();

const DoczWrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

DoczWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoczWrapper;
