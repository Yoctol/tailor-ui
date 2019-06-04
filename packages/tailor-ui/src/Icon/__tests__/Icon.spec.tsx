import React from 'react';

import { render } from 'test/test-utils';

import { Icon } from '../Icon';

describe('Icon', () => {
  it('should render correctly', () => {
    const { container } = render(<Icon type="understood" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <Icon type="understood" data-testid="my-icon" />
    );

    expect(getByTestId('my-icon')).toBeInTheDocument();
  });
});
