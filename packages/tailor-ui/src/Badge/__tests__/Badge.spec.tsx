import React, { useState } from 'react';

import { fireEvent, mockRaf, render, useMockRaf } from 'test/test-utils';

import { Badge } from '../Badge';

describe('Backdrop', () => {
  useMockRaf();

  it('should render badge correctly', async () => {
    const { container } = render(
      <Badge count={2}>
        <button type="button">btn</button>
      </Badge>
    );

    mockRaf.flush();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render standalone badge correctly', async () => {
    const { container } = render(<Badge count={2} />);

    mockRaf.flush();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render customized badge correctly', async () => {
    const { container } = render(
      <Badge count={16} bg="success">
        <button type="button">btn</button>
      </Badge>
    );

    mockRaf.flush();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render overflowCount badge correctly', async () => {
    const { getByTestId } = render(
      <Badge count={100} data-testid="badge">
        <button type="button">btn</button>
      </Badge>
    );

    mockRaf.flush();

    expect(getByTestId('badge')).toHaveTextContent('99+');
  });

  it('should render customized overflowCount badge correctly', async () => {
    const { getByTestId } = render(
      <Badge count={1000} overflowCount={999} data-testid="badge">
        <button type="button">btn</button>
      </Badge>
    );

    mockRaf.flush();

    expect(getByTestId('badge')).toHaveTextContent('999+');
  });

  it('should render badge with 0 count when showZero is true', async () => {
    const { getByTestId } = render(
      <Badge count={0} showZero data-testid="badge">
        <button type="button">btn</button>
      </Badge>
    );

    mockRaf.flush();

    expect(getByTestId('badge')).toHaveTextContent('0');
  });

  it('should not render badge with 0 by default', async () => {
    const { queryByTestId } = render(
      <Badge count={0} data-testid="badge">
        <button type="button">btn</button>
      </Badge>
    );

    mockRaf.flush();

    expect(queryByTestId('badge')).toBeNull();
  });

  it('should render badge dynamically', async () => {
    const DynamicBadge = () => {
      const [count, setCount] = useState(0);

      return (
        <div>
          <Badge count={count} data-testid="badge">
            <button type="button">btn</button>
          </Badge>
          <button
            data-testid="increment"
            type="button"
            onClick={() => setCount(prev => prev + 1)}
          >
            +
          </button>
          <button
            data-testid="decrement"
            type="button"
            onClick={() => setCount(prev => prev - 1)}
          >
            -
          </button>
        </div>
      );
    };

    const { getByTestId, queryByTestId } = render(<DynamicBadge />);

    mockRaf.flush();

    const incrementBtn = getByTestId('increment');
    const decrementBtn = getByTestId('decrement');

    expect(queryByTestId('badge')).toBeNull();

    fireEvent.click(incrementBtn);
    mockRaf.flush();
    expect(getByTestId('badge')).toHaveTextContent('1');

    fireEvent.click(decrementBtn);
    mockRaf.flush();
    expect(queryByTestId('badge')).toBeNull();
  });
});
