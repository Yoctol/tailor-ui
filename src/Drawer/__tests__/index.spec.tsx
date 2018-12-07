import React from 'react';

import { render } from 'test/test-utils';

import Drawer from '..';

describe('Modal', () => {
  it('should render correctly', () => {
    const { container } = render(<Drawer visible onClose={() => {}} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props closable', () => {
    const { container } = render(
      <Drawer visible closable={false} onClose={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
