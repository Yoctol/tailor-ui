import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import { Alert } from '../Alert';

describe('Alert', () => {
  it('should render message correctly', () => {
    const { queryByText } = render(<Alert message="Info Text" />);

    const message = queryByText('Info Text');

    expect(message).toBeInTheDocument();
  });

  it('should render info alert correctly', () => {
    const { container } = render(<Alert message="Info Text" type="info" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render success alert correctly', () => {
    const { container } = render(
      <Alert message="Success Text" type="success" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render warning alert correctly', () => {
    const { container } = render(
      <Alert message="Warning Text" type="warning" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render error alert correctly', () => {
    const { container } = render(<Alert message="Error Text" type="error" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onClosed when closed', async () => {
    const onClosed = jest.fn();

    const { container, queryByText } = render(
      <Alert message="Info Text" closable onClosed={onClosed} />
    );

    // first one icon is type icon
    const [, closeIcon] = container.querySelectorAll('i') as any;

    fireEvent.click(closeIcon);

    const message = queryByText('Info Text');

    await wait(() => {
      expect(message).not.toBeVisible();
    });

    expect(onClosed).toBeCalled();
  });
});
