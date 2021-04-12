import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitForElementToBeRemoved } from 'test/test-utils';

import { useNotification } from '../useNotification';

const Notification = () => {
  const notification = useNotification();

  return (
    <button
      type="button"
      onClick={() =>
        notification.open({ content: 'Success', duration: 1000000 })
      }
    >
      button
    </button>
  );
};

describe('useNotification', () => {
  it('should render notification correctly', async () => {
    const { baseElement } = render(<Notification />);

    const button = screen.getByText('button');
    userEvent.click(button);

    await screen.findByText('Success');

    expect(baseElement).toMatchSnapshot();
  });

  // FIXME:
  it.skip('should remove notification when click close button', async () => {
    const { baseElement } = render(<Notification />);

    const button = screen.getByText('button');
    userEvent.click(button);

    await screen.findByText('Success');

    const closeButton = baseElement.querySelector('i[role=button]');
    userEvent.click(closeButton as Element);

    await waitForElementToBeRemoved(() => screen.queryByText('Success'));
  });
});
