import React from 'react';

import { render } from 'test/test-utils';

import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Dropdown
        visible
        overlay={
          <Dropdown.List>
            <Dropdown.Item>item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">button</button>
      </Dropdown>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
