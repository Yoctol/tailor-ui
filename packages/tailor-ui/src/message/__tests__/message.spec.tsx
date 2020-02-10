import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import { useMessage } from '../useMessage';

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
    const { getByTestId, findByText, baseElement } = render(<Message />);

    const button = getByTestId('button');
    fireEvent.click(button);

    await findByText('Success');

    expect(baseElement).toMatchSnapshot();
  });

  it('should remove message when click close button', async () => {
    const { getByTestId, findByText, queryByText, baseElement } = render(
      <Message />
    );

    const button = getByTestId('button');
    fireEvent.click(button);

    await findByText('Success');

    const closeButton = baseElement.querySelector('i[role=button]');
    fireEvent.click(closeButton as Element);

    await wait(() => expect(queryByText('Success')).not.toBeInTheDocument());
  });
});
