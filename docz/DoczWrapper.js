import PropTypes from 'prop-types';
import React from 'react';

import ThemeProvider from '../src/utils/ThemeProvider';
import injectGlobalCss from '../src/injectGlobalCss';

injectGlobalCss();

const DoczWrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

DoczWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoczWrapper;
