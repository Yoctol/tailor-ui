import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from '../';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const component = shallow(<Checkbox />);

    expect(component).toMatchSnapshot();
  });

  it('should render with props circle, checked and disabled', () => {
    const component = shallow(<Checkbox circle checked disabled />);

    expect(component).toMatchSnapshot();
  });
});
