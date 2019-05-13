import React from 'react';

import { render } from 'test/test-utils';

import Popover from '../Popover';

describe('Popover', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Popover visible title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
