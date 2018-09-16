import React from 'react';

import { render } from 'test/test-utils';

import Modal from '..';

describe('Modal', () => {
  it('should render correctly', () => {
    const { container } = render(<Modal visible />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props closeButton', () => {
    const { container } = render(<Modal visible closable />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
