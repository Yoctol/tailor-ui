import React from 'react';

import { render } from 'test/test-utils';

import Popconfirm from '../Popconfirm';

describe('Popconfirm', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Popconfirm visible content="Content">
        <button type="button">button</button>
      </Popconfirm>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
