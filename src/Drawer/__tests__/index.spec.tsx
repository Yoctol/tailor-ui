import React from 'react';

import { render } from 'test/test-utils';

import Drawer from '..';

describe('Drawer', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Drawer visible onClose={() => {}} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render with props closable', () => {
    const { baseElement } = render(
      <Drawer visible closable={false} onClose={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
