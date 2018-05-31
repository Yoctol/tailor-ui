import React from 'react';

import Button from '../';
import shallowWithTheme from '../../../test/shallowWithTheme';

describe('Button', () => {
  it('should render correctly', () => {
    const component = shallowWithTheme(<Button>Text Button</Button>);

    expect(component).toMatchSnapshot();
  });

  it('should render with props light, circle and active', () => {
    const component = shallowWithTheme(
      <Button light circle active>
        Text Button
      </Button>
    );

    expect(component).toMatchSnapshot();
  });
});
