import React from 'react';

import { render } from 'test/test-utils';

import Select from '../Select';

describe('Select', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Select
        value={{ label: 'Item 1', value: '1' }}
        options={[
          {
            label: 'Item 1',
            value: '1',
          },
          {
            label: 'Item 2',
            value: '2',
          },
        ]}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <Select
        value={{ label: 'Item 1', value: '1' }}
        options={[
          {
            label: 'Item 1',
            value: '1',
          },
          {
            label: 'Item 2',
            value: '2',
          },
        ]}
        data-testid="my-select"
      />
    );

    expect(getByTestId('my-select')).toBeInTheDocument();
  });

  it('should support data-testid for options', () => {
    const { getByTestId } = render(
      <Select
        value={{ label: 'Item 1', value: '1' }}
        options={[
          {
            label: 'Item 1',
            value: '1',
            'data-testid': 'my-option-1',
          },
          {
            label: 'Item 2',
            value: '2',
            'data-testid': 'my-option-2',
          },
        ]}
      />
    );

    expect(getByTestId('my-option-1')).toBeInTheDocument();
    expect(getByTestId('my-option-1')).toBeInTheDocument();
  });
});
