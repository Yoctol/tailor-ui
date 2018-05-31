import React from 'react';
import ThemeProvider from '../src/utils/ThemeProvider';

export default storyFn => <ThemeProvider theme="blue">{storyFn()}</ThemeProvider>;
