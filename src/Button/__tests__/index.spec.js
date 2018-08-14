import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Button from '..';

describe('Button', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(<Button>Text Button</Button>);

    expect(component).toMatchSnapshot();
  });

  it('should render with props variant and type', () => {
    const component = mountWithTheme(
      <Button type="info" variant="rounded">
        Text Button
      </Button>
    );

    expect(component).toMatchSnapshot();
  });
});
