import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Tooltip } from '../Tooltip';

jest.mock('lodash.debounce', () => (fn: () => void) => {
  let t: NodeJS.Timeout;

  const ret = () => {
    t = setTimeout(fn, 1000);
  };

  ret.cancel = () => {
    clearTimeout(t);
  };

  return ret;
});

describe('Tooltip', () => {
  it('should render tooltip correctly', () => {
    const { baseElement } = render(
      <Tooltip visible content="Content">
        <span>target</span>
      </Tooltip>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render tooltip content when hovered', async () => {
    render(
      <Tooltip content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = screen.getByText('target');
    userEvent.hover(target);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render tooltip content when hovered over 1000ms', async () => {
    jest.useFakeTimers();

    render(
      <Tooltip mouseEnterDelay={1000} content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = screen.getByText('target');
    userEvent.hover(target);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should not render tooltip content when hovered does not over 1000ms', async () => {
    jest.useFakeTimers();

    render(
      <Tooltip mouseEnterDelay={1000} content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = screen.getByText('target');
    userEvent.hover(target);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    jest.advanceTimersByTime(500);
    userEvent.unhover(target);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should keep render tooltip content when hover on content', async () => {
    jest.useFakeTimers();

    render(
      <Tooltip content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = screen.getByText('target');
    userEvent.hover(target);

    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();

    userEvent.hover(content);

    expect(content).toBeInTheDocument();
  });
});
