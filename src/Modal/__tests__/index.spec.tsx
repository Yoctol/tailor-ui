import React from 'react';

import { render } from 'test/test-utils';

import Modal from '..';

describe('Modal', () => {
  it('should render correctly', () => {
    const { container } = render(<Modal visible onCancel={() => {}} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props closeButton', () => {
    const { container } = render(
      <Modal visible closable onCancel={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
