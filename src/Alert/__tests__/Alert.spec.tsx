import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Alert } from '../Alert';

describe('Alert', () => {
  it('should render message correctly', () => {
    render(<Alert message="Info Text" />);

    const message = screen.queryByText('Info Text');

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

    const { container } = render(
      <Alert message="Info Text" closable onClosed={onClosed} />
    );

    // first one icon is type icon
    const [, closeIcon] = Array.from(container.querySelectorAll('i'));
    userEvent.click(closeIcon);

    expect(onClosed).toBeCalled();
  });
});
