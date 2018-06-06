import React from 'react';

import shallowWithTheme from 'test/shallowWithTheme';

import Checkbox from '../';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const component = shallowWithTheme(<Checkbox />);

    expect(component).toMatchSnapshot();
  });

  it('should render with props circle, checked and disabled', () => {
    const component = shallowWithTheme(<Checkbox circle checked disabled />);

    expect(component).toMatchSnapshot();
  });
});
