import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitForElementToBeRemoved } from 'test/test-utils';

import { Popover } from '../Popover';

describe('Popover', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Popover visible title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render to document when click children', () => {
    render(
      <Popover title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    const button = screen.getByText('button');

    userEvent.click(button);

    const content = screen.getByText('Popover Content');

    expect(content).toBeInTheDocument();
  });

  it('should not visible when click children twice', async () => {
    render(
      <Popover title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    const button = screen.getByText('button');

    userEvent.click(button);
    expect(screen.getByText('Popover Content')).toBeInTheDocument();

    userEvent.click(button);

    const content = screen.queryByText('Popover Content');
    await waitForElementToBeRemoved(content);
  });

  it('should not visible when click hide button', async () => {
    render(
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

    const button = screen.getByText('button');
    userEvent.click(button);

    const hideButton = screen.getByText('hide');
    userEvent.click(hideButton);

    const content = screen.queryByText('Popover Content');
    await waitForElementToBeRemoved(content);
  });

  it('should not visible when click outside', async () => {
    render(
      <div>
        <Popover title="Popover Title" content="Popover Content">
          <button type="button">button</button>
        </Popover>
        <button type="button">outside</button>
      </div>
    );

    const button = screen.getByText('button');
    userEvent.click(button);

    const outsideButton = screen.getByText('outside');
    userEvent.click(outsideButton);

    const content = screen.queryByText('Popover Content');
    await waitForElementToBeRemoved(content);
  });

  it('should close latest one when nested usage', async () => {
    render(
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

    const button1 = screen.getByText('button1');
    userEvent.click(button1);

    const button2 = screen.getByText('button2');
    userEvent.click(button2);

    const button3 = screen.getByText('button3');
    userEvent.click(button3);

    const popover1 = screen.getByText('popover1');
    const popover2 = screen.getByText('popover2');
    const popover3 = screen.getByText('popover3');

    expect(popover1).toBeInTheDocument();
    expect(popover2).toBeInTheDocument();
    expect(popover3).toBeInTheDocument();

    const outsideButton = screen.getByText('outside');
    userEvent.click(outsideButton);

    expect(popover1).toBeInTheDocument();
    expect(popover2).toBeInTheDocument();
    await waitForElementToBeRemoved(popover3);
  });
});
