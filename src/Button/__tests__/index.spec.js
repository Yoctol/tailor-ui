import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Button from '../';

describe('Button', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(<Button>Text Button</Button>);

    expect(component).toMatchSnapshot();
  });

  it('should render with props light, circle and active', () => {
    const component = mountWithTheme(
      <Button light circle active>
        Text Button
      </Button>
    );

    expect(component).toMatchSnapshot();
  });
});
