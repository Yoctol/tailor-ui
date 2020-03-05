import React from 'react';

import { render } from 'test/test-utils';

import { Badge } from '../Badge';

describe('Backdrop', () => {
  it('should render badge correctly', async () => {
    const { container } = render(
      <Badge count={2}>
        <button type="button">btn</button>
      </Badge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render standalone badge correctly', async () => {
    const { container } = render(<Badge count={2} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render customize badge correctly', async () => {
    const { container } = render(
      <Badge count={16} bg="success">
        <button type="button">btn</button>
      </Badge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render overflowCount badge correctly', async () => {
    const { getByText } = render(
      <Badge count={100}>
        <button type="button">btn</button>
      </Badge>
    );

    expect(getByText('99+')).toBeInTheDocument();
  });

  it('should render customize overflowCount badge correctly', async () => {
    const { getByText } = render(
      <Badge count={1000} overflowCount={999}>
        <button type="button">btn</button>
      </Badge>
    );

    expect(getByText('999+')).toBeInTheDocument();
  });
});
