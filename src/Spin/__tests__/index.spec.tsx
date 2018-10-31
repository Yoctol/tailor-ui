import React from 'react';

import { render } from 'test/test-utils';

import Spin from '..';

describe('Spin', () => {
  it('should render correctly', () => {
    const { container } = render(
      <div style={{ height: '300px' }}>
        <Spin />
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render Loading... as default text', () => {
    const { queryByText } = render(
      <div style={{ height: '300px' }}>
        <Spin />
      </div>
    );

    const spin = queryByText('Loading...');

    expect(spin).toBeInTheDocument();
  });

  it('should render custom text', () => {
    const { queryByText } = render(
      <div style={{ height: '300px' }}>
        <Spin text="foo bar" />
      </div>
    );

    const spin = queryByText('foo bar');

    expect(spin).toBeInTheDocument();
  });
});
