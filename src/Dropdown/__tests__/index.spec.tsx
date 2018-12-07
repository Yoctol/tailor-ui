import React, { ReactElement } from 'react';

import { fireEvent, render, wait, waitForElement } from 'test/test-utils';

import Button from '../../Button';
import Dropdown from '../Dropdown';

const overlayTestId = 'dropdown-overlay';

const setup = async ({
  props = {},
  overlay,
}: {
  props?: any;
  overlay?: ReactElement<any>;
} = {}) => {
  const onBasicItemClick = jest.fn();
  const onDisabledItemClick = jest.fn();
  const onKeepItemClick = jest.fn();
  const defaultOverlay = (
    <Dropdown.List>
      <Dropdown.Item key="1" onClick={onBasicItemClick}>
        Basic Item
      </Dropdown.Item>
      <Dropdown.Item key="2" onClick={onDisabledItemClick} disabled>
        Disibled Item
      </Dropdown.Item>
      <Dropdown.Item key="3" onClick={onKeepItemClick} keep>
        Keep Item
      </Dropdown.Item>
    </Dropdown.List>
  );

  const utils = render(
    <Dropdown overlay={overlay || defaultOverlay} {...props}>
      {({ visible, toggle }) => (
        <Button text={visible} onClick={toggle}>
          Toggle
        </Button>
      )}
    </Dropdown>
  );

  const button = utils.getByText('Toggle');

  fireEvent.click(button);

  await waitForElement(() => utils.queryByTestId(overlayTestId));

  return {
    overlay: utils.getByTestId(overlayTestId),
    onBasicItemClick,
    onDisabledItemClick,
    onKeepItemClick,
    ...utils,
  };
};

describe('Dropdown', () => {
  it('should render correctly', async () => {
    const { baseElement } = await setup();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with diffrient placement', async () => {
    const { baseElement } = await setup({ props: { placement: 'topRight' } });

    expect(baseElement).toMatchSnapshot();
  });

  it('should unmount when click item', async () => {
    const {
      getByText,
      queryByTestId,
      overlay,
      onBasicItemClick,
    } = await setup();

    expect(overlay).toBeInTheDocument();

    const item = getByText('Basic Item');
    fireEvent.click(item);

    expect(onBasicItemClick).toBeCalled();
    await wait(() =>
      expect(queryByTestId(overlayTestId)).not.toBeInTheDocument()
    );
  });

  it('should not unmount when click keep item', async () => {
    const {
      getByText,
      queryByTestId,
      overlay,
      onKeepItemClick,
    } = await setup();

    expect(overlay).toBeInTheDocument();

    const item = getByText('Keep Item');
    fireEvent.click(item);

    expect(onKeepItemClick).toBeCalled();
    await wait(() => expect(queryByTestId(overlayTestId)).toBeInTheDocument());
  });

  it('should not trigger onClick when click disabled item', async () => {
    const { getByText, overlay, onDisabledItemClick } = await setup();

    expect(overlay).toBeInTheDocument();

    const item = getByText('Disibled Item');
    fireEvent.click(item);

    expect(onDisabledItemClick).not.toBeCalled();
  });

  it('should render subList when hover on Item and match snapshots', async () => {
    const { overlay, getByText } = await setup({
      overlay: (
        <Dropdown.List textAlign="center">
          <Dropdown.Item key="Item 1">Item 1</Dropdown.Item>
          <Dropdown.Item key="Item 2">Item 2</Dropdown.Item>
          <Dropdown.SubList key="Item 3" title="Sub List">
            <Dropdown.Item key="1">Sub Item</Dropdown.Item>
            <Dropdown.SubList
              key="Overflow Sub List"
              title="Overflow Sub List"
              maxHeight="200px"
              overflow="auto"
            >
              <Dropdown.Item key="1">Sub List Item</Dropdown.Item>
            </Dropdown.SubList>
          </Dropdown.SubList>
        </Dropdown.List>
      ),
    });

    expect(overlay).toBeInTheDocument();

    const subList = getByText('Sub List');
    fireEvent.mouseEnter(subList);

    const subItemOfSubList = getByText('Sub Item');
    await wait(() => expect(subItemOfSubList).toBeVisible());
  });
});
