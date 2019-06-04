import React from 'react';

import { fireEvent, render, wait, waitForElement } from 'test/test-utils';

import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Dropdown
        visible
        overlay={
          <Dropdown.List>
            <Dropdown.Item>item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">button</button>
      </Dropdown>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should not visible when click dropdown item', async () => {
    const { getByText, queryByTestId } = render(
      <Dropdown
        overlay={
          <Dropdown.List data-testid="dropdown-list">
            <Dropdown.Item>item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">button</button>
      </Dropdown>
    );

    const button = getByText('button');

    fireEvent.click(button);

    const item = await waitForElement(() => getByText('item'));

    fireEvent.click(item);

    await wait(() =>
      expect(queryByTestId('dropdown-list')).not.toBeInTheDocument()
    );
  });

  it('should keeo visible when click dropdown keep item', async () => {
    const { getByText, queryByTestId } = render(
      <Dropdown
        overlay={
          <Dropdown.List data-testid="dropdown-list">
            <Dropdown.Item keep>item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">button</button>
      </Dropdown>
    );

    const button = getByText('button');

    fireEvent.click(button);

    const item = await waitForElement(() => getByText('item'));

    fireEvent.click(item);

    await wait(() =>
      expect(queryByTestId('dropdown-list')).toBeInTheDocument()
    );
  });
});
