import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitForElementToBeRemoved } from 'test/test-utils';

import { useMessage } from '../useMessage';

const Message = () => {
  const message = useMessage();

  return (
    <button type="button" onClick={() => message.success('Success', 1000000)}>
      button
    </button>
  );
};

describe('useMessage', () => {
  it('should render message correctly', async () => {
    const { baseElement } = render(<Message />);

    const button = screen.getByText('button');
    userEvent.click(button);

    await screen.findByText('Success');

    expect(baseElement).toMatchSnapshot();
  });

  // FIXME:
  it.skip('should remove message when click close button', async () => {
    const { baseElement } = render(<Message />);

    const button = screen.getByText('button');
    userEvent.click(button);

    await screen.findByText('Success');

    const closeButton = baseElement.querySelector('i[role=button]');
    userEvent.click(closeButton as Element);

    await waitForElementToBeRemoved(() => screen.queryByText('Success'));
  });
});
