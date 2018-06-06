import React from 'react';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import { defaultTheme } from '../src/theme';

const mountWithTheme = (children, options = {}, theme = defaultTheme) => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    options
  );
  const context = wrapper.instance().getChildContext();

  return wrapper.mount({ context }).children();
};

export default mountWithTheme;
