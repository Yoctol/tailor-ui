import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Checkbox from '..';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(<Checkbox>Checkbox</Checkbox>);

    expect(component).toMatchSnapshot();
  });

  it('should render with props disabled', () => {
    const component = mountWithTheme(<Checkbox disabled>Checkbox</Checkbox>);

    expect(component).toMatchSnapshot();
  });
});
