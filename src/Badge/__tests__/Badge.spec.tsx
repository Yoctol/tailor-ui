import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

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

  it('should render customized badge correctly', async () => {
    const { container } = render(
      <Badge count={16} bg="success">
        <button type="button">btn</button>
      </Badge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render overflowCount badge correctly', async () => {
    const { container } = render(
      <Badge count={100}>
        <button type="button">btn</button>
      </Badge>
    );

    expect(container).toHaveTextContent('99+');
  });

  it('should render customized overflowCount badge correctly', async () => {
    const { container } = render(
      <Badge count={1000} overflowCount={999}>
        <button type="button">btn</button>
      </Badge>
    );

    expect(container).toHaveTextContent('999+');
  });

  it('should render badge with 0 count when showZero is true', async () => {
    const { container } = render(
      <Badge count={0} showZero>
        <button type="button">btn</button>
      </Badge>
    );

    expect(container).toHaveTextContent('0');
  });

  it('should not render badge with 0 by default', async () => {
    const { container } = render(
      <Badge count={0}>
        <button type="button">btn</button>
      </Badge>
    );

    expect(container).not.toHaveTextContent('0');
  });

  it('should render badge dynamically', async () => {
    const DynamicBadge = () => {
      const [count, setCount] = useState(0);

      return (
        <div>
          <Badge count={count}>
            <button type="button">btn</button>
          </Badge>
          <button type="button" onClick={() => setCount((prev) => prev + 1)}>
            +
          </button>
          <button type="button" onClick={() => setCount((prev) => prev - 1)}>
            -
          </button>
        </div>
      );
    };

    const { container } = render(<DynamicBadge />);

    const incrementBtn = screen.getByText('+');
    const decrementBtn = screen.getByText('-');

    expect(container).not.toHaveTextContent('0');

    userEvent.click(incrementBtn);
    expect(container).toHaveTextContent('1');

    userEvent.click(decrementBtn);
    await waitFor(() => expect(container).not.toHaveTextContent('0'));
  });
});
