import React from 'react';

import { render, wait } from 'test/test-utils';

import Backdrop from '../Backdrop';

describe('Backdrop', () => {
  it('should render backdrop correctly', async () => {
    const { container } = render(<Backdrop visible />);

    await wait(() => expect(container.firstChild).toHaveStyle('opacity: 1;'));

    expect(container.firstChild).toBeVisible();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render backdrop', async () => {
    const { container } = render(<Backdrop visible={false} />);

    expect(container.firstChild).toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});
