import React from 'react';

import { render } from 'test/test-utils';

import Button from '..';

describe('Button', () => {
  it('should render correctly', () => {
    const { container } = render(<Button>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props variant and type', () => {
    const { container } = render(
      <Button type="info" rounded>
        Text Button
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
