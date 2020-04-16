import React from 'react';

import { fireEvent, render, waitFor } from 'test/test-utils';

import { useMessage } from '../useMessage';

const Message = () => {
  const message = useMessage();

  return (
    <button
      type="button"
      data-testid="button"
      onClick={() => message.success('Success', 1000000)}
    >
      button
    </button>
  );
};

describe('useMessage', () => {
  it('should render message correctly', async () => {
    const { getByTestId, findByText, baseElement } = render(<Message />);

    const button = getByTestId('button');
    fireEvent.click(button);

    await findByText('Success');

    expect(baseElement).toMatchSnapshot();
  });

  // FIXME:
  it.skip('should remove message when click close button', async () => {
    const { getByTestId, findByText, queryByText, baseElement } = render(
      <Message />
    );

    const button = getByTestId('button');
    fireEvent.click(button);

    await findByText('Success');

    const closeButton = baseElement.querySelector('i[role=button]');
    fireEvent.click(closeButton as Element);

    await waitFor(() => expect(queryByText('Success')).not.toBeInTheDocument());
  });
});
