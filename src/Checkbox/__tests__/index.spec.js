import React from 'react';

import { render } from 'test/test-utils';

import Checkbox from '..';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const { container } = render(<Checkbox>Checkbox</Checkbox>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props disabled', () => {
    const { container } = render(<Checkbox disabled>Checkbox</Checkbox>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
