import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';

import defaultTheme from '../src/theme';

const shallowWithTheme = (children, options = {}, theme = defaultTheme) => {
  const wrapper = shallow(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    options
  );
  const context = wrapper.instance().getChildContext();

  return wrapper.shallow({ context });
};

export default shallowWithTheme;
