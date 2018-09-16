import React from 'react';

import { render } from 'test/test-utils';

import Icon from '..';

describe('Icon', () => {
  it('should render correctly', () => {
    const { container } = render(<Icon type="understood" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
