import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Radio from '..';

describe('Radio', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(<Radio>Radio</Radio>);

    expect(component).toMatchSnapshot();
  });

  it('should render with props disabled', () => {
    const component = mountWithTheme(<Radio disabled>Radio</Radio>);

    expect(component).toMatchSnapshot();
  });
});
