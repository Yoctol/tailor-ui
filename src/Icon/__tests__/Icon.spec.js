import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Icon from '..';

describe('Icon', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(<Icon type="understood" />);

    expect(component).toMatchSnapshot();
  });
});
