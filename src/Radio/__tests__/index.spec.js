import React from 'react';

import { render } from 'test/test-utils';

import Radio from '..';

describe('Radio', () => {
  it('should render correctly', () => {
    const { container } = render(<Radio>Radio</Radio>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props disabled', () => {
    const { container } = render(<Radio disabled>Radio</Radio>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
