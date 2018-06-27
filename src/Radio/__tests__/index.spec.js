import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Radio from '../';
import Label from '../../Form/Label';

describe('Radio', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(
      <div>
        <Radio id="radio" />
        <Label htmlFor="radio">Radio</Label>
      </div>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props disabled', () => {
    const component = mountWithTheme(
      <div>
        <Radio id="radio" disabled />
        <Label htmlFor="radio">Radio</Label>
      </div>
    );

    expect(component).toMatchSnapshot();
  });
});
