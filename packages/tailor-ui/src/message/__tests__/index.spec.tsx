import React from 'react';

import { fireEvent, render, wait, waitForElement } from 'test/test-utils';

import useMessage from '../useMessage';

const Message = () => {
  const message = useMessage();

  return (
    <button
      type="button"
      data-testid="button"
      onClick={() => message.success('Success')}
    >
      button
    </button>
  );
};

describe('useMessage', () => {
  it('should render message correctly', async () => {
    const { getByTestId, getByText, baseElement } = render(<Message />);

    const button = getByTestId('button');
    fireEvent.click(button);

    await waitForElement(() => getByText('Success'));

    expect(baseElement).toMatchSnapshot();
  });

  it('should remove message when click close button', async () => {
    const { getByTestId, getByText, getByRole, queryByText } = render(
      <Message />
    );

    const button = getByTestId('button');
    fireEvent.click(button);

    await waitForElement(() => getByText('Success'));

    const closeButton = getByRole('button');
    fireEvent.click(closeButton);

    await wait(() => expect(queryByText('Success')).not.toBeInTheDocument());
  });
});
