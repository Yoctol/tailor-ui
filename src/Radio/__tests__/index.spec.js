import React from 'react';

import shallowWithTheme from 'test/shallowWithTheme';

import Radio from '../';
import Label from '../../Form/Label';

describe('Radio', () => {
  it('should render correctly', () => {
    const component = shallowWithTheme(
      <form>
        <Radio />
        <Label htmlFor="medium">中</Label>
      </form>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props size and disabled', () => {
    const component = shallowWithTheme(
      <form>
        <Radio size="lg" disabled />
        <Label htmlFor="large">大</Label>
      </form>
    );

    expect(component).toMatchSnapshot();
  });
});
