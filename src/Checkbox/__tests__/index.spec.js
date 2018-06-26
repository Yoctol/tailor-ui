import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Checkbox from '..';

import Label from '../../Form/Label';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(
      <div>
        <Checkbox id="checkbox" />
        <Label htmlFor="checkbox">Checkbox</Label>
      </div>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props disabled', () => {
    const component = mountWithTheme(
      <div>
        <Checkbox id="checkbox" disabled />
        <Label htmlFor="checkbox">Checkbox</Label>
      </div>
    );

    expect(component).toMatchSnapshot();
  });
});
