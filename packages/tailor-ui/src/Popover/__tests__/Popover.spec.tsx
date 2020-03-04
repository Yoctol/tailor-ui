import React from 'react';

import { fireEvent, mockRaf, render, useMockRaf, wait } from 'test/test-utils';

import { Popover } from '../Popover';

describe('Popover', () => {
  useMockRaf();

  it('should render correctly', () => {
    const { baseElement } = render(
      <Popover visible title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    mockRaf.flushSpring();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render to document when click children', () => {
    const { getByText } = render(
      <Popover title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    const button = getByText('button');

    fireEvent.click(button);

    mockRaf.flushSpring();

    const content = getByText('Popover Content');

    expect(content).toBeInTheDocument();
  });

  it('should not visible when click children twice', () => {
    const { getByText, queryByText } = render(
      <Popover title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    const button = getByText('button');

    fireEvent.click(button);
    mockRaf.flushSpring();
    expect(queryByText('Popover Content')).toBeInTheDocument();

    fireEvent.click(button);
    mockRaf.flushSpring();

    const content = queryByText('Popover Content');
    expect(content).not.toBeInTheDocument();
  });

  it('should not visible when click hide button', () => {
    const { getByText, queryByText } = render(
      <Popover
        title="Popover Title"
        content={(hide) => (
          <>
            Popover Content
            <button type="button" onClick={hide}>
              hide
            </button>
          </>
        )}
      >
        <button type="button">button</button>
      </Popover>
    );

    const button = getByText('button');
    fireEvent.click(button);
    mockRaf.flushSpring();

    const hideButton = getByText('hide');
    fireEvent.click(hideButton);
    mockRaf.flushSpring();

    const content = queryByText('Popover Content');

    expect(content).not.toBeInTheDocument();
  });

  it('should not visible when click outside', () => {
    const { getByText, queryByText } = render(
      <div>
        <Popover title="Popover Title" content="Popover Content">
          <button type="button">button</button>
        </Popover>
        <button type="button">outside</button>
      </div>
    );

    const button = getByText('button');
    fireEvent.click(button);
    mockRaf.flushSpring();

    const outsideButton = getByText('outside');
    fireEvent.click(outsideButton);
    mockRaf.flushSpring();

    const content = queryByText('Popover Content');

    expect(content).not.toBeInTheDocument();
  });

  it('should close latest one when nested usage', async () => {
    const { getByText } = render(
      <div>
        <Popover
          title="popover1"
          content={
            <Popover
              title="popover2"
              content={
                <Popover title="popover3" content="latest">
                  <button type="button">button3</button>
                </Popover>
              }
            >
              <button type="button">button2</button>
            </Popover>
          }
        >
          <button type="button">button1</button>
        </Popover>
        <button type="button">outside</button>
      </div>
    );

    const button1 = getByText('button1');
    fireEvent.click(button1);
    mockRaf.flushSpring();

    const button2 = getByText('button2');
    fireEvent.click(button2);
    mockRaf.flushSpring();

    const button3 = getByText('button3');
    fireEvent.click(button3);
    mockRaf.flushSpring();

    const popover1 = getByText('popover1');
    const popover2 = getByText('popover2');
    const popover3 = getByText('popover3');

    expect(popover1).toBeInTheDocument();
    expect(popover2).toBeInTheDocument();
    expect(popover3).toBeInTheDocument();

    const outsideButton = getByText('outside');
    fireEvent.click(outsideButton);
    mockRaf.flushSpring();

    expect(popover1).toBeInTheDocument();
    expect(popover2).toBeInTheDocument();
    expect(popover3).not.toBeInTheDocument();
  });
});
