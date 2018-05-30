import React from 'react';
import { shallow } from 'enzyme';

import Label from '../../Form/Label';
import Radio from '../';

describe('Radio', () => {
  it('should render correctly', () => {
    const component = shallow(
      <form>
        <Radio />
        <Label htmlFor="medium">中</Label>
      </form>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props size and disabled', () => {
    const component = shallow(
      <form>
        <Radio size="lg" disabled />
        <Label htmlFor="large">大</Label>
      </form>
    );

    expect(component).toMatchSnapshot();
  });
});
