import React from 'react';

import { fireEvent, mockRaf, render, useMockRaf } from 'test/test-utils';

import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  useMockRaf();

  it('should render correctly', () => {
    const { baseElement } = render(
      <Dropdown
        visible
        overlay={
          <Dropdown.List>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">Button</button>
      </Dropdown>
    );

    mockRaf.flushSpring();

    expect(baseElement).toMatchSnapshot();
  });

  it('should not visible when click dropdown item', async () => {
    const { getByTestId, queryByTestId } = render(
      <Dropdown
        overlay={
          <Dropdown.List data-testid="dropdown-list">
            <Dropdown.Item data-testid="item">Item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button data-testid="button" type="button">
          Button
        </button>
      </Dropdown>
    );

    const button = getByTestId('button');
    fireEvent.click(button);
    mockRaf.flushSpring();

    const item = getByTestId('item');
    fireEvent.click(item);
    mockRaf.flushSpring();

    expect(queryByTestId('dropdown-list')).toBeNull();
  });

  it('should keep visible when click dropdown keep item', async () => {
    const { getByTestId } = render(
      <Dropdown
        overlay={
          <Dropdown.List data-testid="dropdown-list">
            <Dropdown.Item data-testid="item" keep>
              Item
            </Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button data-testid="button" type="button">
          Button
        </button>
      </Dropdown>
    );

    const button = getByTestId('button');
    fireEvent.click(button);
    mockRaf.flushSpring();

    const item = getByTestId('item');
    fireEvent.click(item);
    mockRaf.flushSpring();

    expect(getByTestId('dropdown-list')).toBeInTheDocument();
  });

  // FIXME:
  it.skip('should show SubList when mouse enter', () => {
    const { getByTestId } = render(
      <Dropdown
        overlay={
          <Dropdown.List>
            <Dropdown.Item>Item</Dropdown.Item>
            <Dropdown.SubList data-testid="sub-list" title="SubList">
              <Dropdown.Item data-testid="sub-list-item">
                Sub List Item
              </Dropdown.Item>
            </Dropdown.SubList>
          </Dropdown.List>
        }
      >
        <button data-testid="button" type="button">
          Button
        </button>
      </Dropdown>
    );

    const button = getByTestId('button');
    fireEvent.click(button);
    mockRaf.flushSpring();

    const item = getByTestId('sub-list');
    fireEvent.mouseEnter(item);
    mockRaf.flushSpring();

    expect(getByTestId('sub-list-item')).toBeInTheDocument();
  });
});
