import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
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

    expect(baseElement).toMatchSnapshot();
  });

  it('should not visible when click dropdown item', async () => {
    render(
      <Dropdown
        overlay={
          <Dropdown.List>
            <Dropdown.Item>Item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">Button</button>
      </Dropdown>
    );

    const button = screen.getByText('Button');
    userEvent.click(button);

    const item = screen.getByText('Item');
    userEvent.click(item);

    expect(screen.queryByTestId('dropdown-list')).not.toBeInTheDocument();
  });

  it('should keep visible when click dropdown keep item', async () => {
    render(
      <Dropdown
        overlay={
          <Dropdown.List>
            <Dropdown.Item keep>Item</Dropdown.Item>
          </Dropdown.List>
        }
      >
        <button type="button">Button</button>
      </Dropdown>
    );

    const button = screen.getByText('Button');
    userEvent.click(button);

    const item = screen.getByText('Item');
    userEvent.click(item);

    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('should show SubList when mouse enter', async () => {
    render(
      <Dropdown
        overlay={
          <Dropdown.List>
            <Dropdown.Item>Item</Dropdown.Item>
            <Dropdown.SubList title="SubList">
              <Dropdown.Item>Sub List Item</Dropdown.Item>
            </Dropdown.SubList>
          </Dropdown.List>
        }
      >
        <button data-testid="button" type="button">
          Button
        </button>
      </Dropdown>
    );

    const button = screen.getByText('Button');
    userEvent.click(button);

    const item = screen.getByText('SubList');
    userEvent.hover(item);

    const subListItem = await screen.findByText('Sub List Item');

    expect(subListItem).toBeInTheDocument();
  });
});
