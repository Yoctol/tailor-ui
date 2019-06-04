import React from 'react';

import { render } from 'test/test-utils';

import { Modal } from '../Modal';

describe('Modal', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Modal visible onCancel={() => {}} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render correctly with lg size', () => {
    const { baseElement } = render(
      <Modal size="lg" visible onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with props closable', () => {
    const { baseElement } = render(
      <Modal visible closable onCancel={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  // TODO: Add useModal tests
});
