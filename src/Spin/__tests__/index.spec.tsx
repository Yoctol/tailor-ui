import React from 'react';

import { render } from 'test/test-utils';

import Spin from '../Spin';

describe('Spin', () => {
  it('should render correctly', () => {
    const { container } = render(
      <div style={{ height: '300px' }}>
        <Spin />
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
