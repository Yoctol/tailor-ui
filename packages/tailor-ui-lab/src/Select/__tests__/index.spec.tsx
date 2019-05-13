import React from 'react';

import { render } from 'test/test-utils';

import Select from '../Select';

describe('Select', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Select
        options={[
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Apple', value: 'apple' },
          { label: 'Mango', value: 'mango' },
        ]}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
