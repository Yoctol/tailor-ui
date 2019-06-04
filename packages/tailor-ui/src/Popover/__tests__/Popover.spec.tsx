import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

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
    const { getByText } = render(
      <Popover title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    const button = getByText('button');

    fireEvent.click(button);

    const popconfirm = getByText('Popover Content');

    expect(popconfirm).toBeInTheDocument();
  });

  it('should not visible when click children twice', () => {
    const { getByText } = render(
      <Popover title="Popover Title" content="Popover Content">
        <button type="button">button</button>
      </Popover>
    );

    const button = getByText('button');

    fireEvent.click(button);
    fireEvent.click(button);

    const popconfirm = getByText('Popover Content');

    expect(popconfirm).not.toBeVisible();
  });

  it('should not visible when click hide button', () => {
    const { getByText } = render(
      <Popover
        title="Popover Title"
        content={hide => (
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

    const hideButton = getByText('hide');
    fireEvent.click(hideButton);

    const popconfirm = getByText('Popover Content');

    expect(popconfirm).not.toBeVisible();
  });

  it('should not visible when click outside', () => {
    const { getByText } = render(
      <div>
        <Popover title="Popover Title" content="Popover Content">
          <button type="button">button</button>
        </Popover>
        <button type="button">outside</button>
      </div>
    );

    const button = getByText('button');
    fireEvent.click(button);

    const outsideButton = getByText('outside');
    fireEvent.click(outsideButton);

    const popconfirm = getByText('Popover Content');

    expect(popconfirm).not.toBeVisible();
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
    const button2 = getByText('button2');
    fireEvent.click(button2);
    const button3 = getByText('button3');
    fireEvent.click(button3);

    const popover1 = getByText('popover1');
    const popover2 = getByText('popover2');
    const popover3 = getByText('popover3');
    await wait(() => [
      expect(popover1).toBeVisible(),
      expect(popover2).toBeVisible(),
      expect(popover3).toBeVisible(),
    ]);

    const outsideButton = getByText('outside');
    fireEvent.click(outsideButton);

    await wait(() => [
      expect(popover1).toBeVisible(),
      expect(popover2).toBeVisible(),
      expect(popover3).not.toBeVisible(),
    ]);
  });
});
