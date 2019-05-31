import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import Tooltip from '../Tooltip';

jest.mock('lodash.debounce', () => (fn: Function) => {
  let t = 0;

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
    const { getByText } = render(
      <Tooltip content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = getByText('target');
    fireEvent.mouseEnter(target);

    await wait(() => expect(getByText('Content')).toBeInTheDocument());
  });

  it('should render tooltip content when hovered over 1000ms', async () => {
    jest.useFakeTimers();

    const { getByText, queryByText } = render(
      <Tooltip mouseEnterDelay={1000} content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = getByText('target');
    fireEvent.mouseEnter(target);

    expect(queryByText('Content')).not.toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    await wait(() => expect(getByText('Content')).toBeInTheDocument());
  });

  it('should not render tooltip content when hovered does not over 1000ms', async () => {
    jest.useFakeTimers();

    const { getByText, queryByText } = render(
      <Tooltip mouseEnterDelay={1000} content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = getByText('target');
    fireEvent.mouseEnter(target);

    expect(queryByText('Content')).not.toBeInTheDocument();

    jest.advanceTimersByTime(500);
    fireEvent.mouseLeave(target);

    expect(queryByText('Content')).not.toBeInTheDocument();
  });

  it('should keep render tooltip content when hover on content', async () => {
    jest.useFakeTimers();

    const { getByText } = render(
      <Tooltip content="Content">
        <span>target</span>
      </Tooltip>
    );

    const target = getByText('target');
    fireEvent.mouseEnter(target);

    const content = getByText('Content');
    expect(content).toBeInTheDocument();

    fireEvent.mouseEnter(content);

    expect(content).toBeInTheDocument();
  });
});
