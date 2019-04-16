import React from 'react';

import { render } from 'test/test-utils';

import Backdrop from '../Backdrop';

describe('Backdrop', () => {
  it('should render backdrop correctly', async () => {
    const { baseElement } = render(<Backdrop visible />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should not render backdrop', async () => {
    const { baseElement } = render(<Backdrop visible={false} />);

    expect(baseElement).toMatchSnapshot();
  });
});
