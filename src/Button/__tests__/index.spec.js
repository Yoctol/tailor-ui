import React from 'react';
import { shallow } from 'enzyme';

import Button from '../';

describe('Button', () => {
  it('should render correctly', () => {
    const component = shallow(<Button>Text Button</Button>);

    expect(component).toMatchSnapshot();
  });

  it('should render with props light, circle and active', () => {
    const component = shallow(
      <Button light circle active>
        Text Button
      </Button>
    );

    expect(component).toMatchSnapshot();
  });
});
