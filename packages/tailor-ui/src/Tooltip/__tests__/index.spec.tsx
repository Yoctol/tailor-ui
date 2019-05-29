import React from 'react';

import { render } from 'test/test-utils';

import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('should render tooltip correctly', () => {
    const { baseElement } = render(
      <Tooltip visible content="Content">
        <span>target</span>
      </Tooltip>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
