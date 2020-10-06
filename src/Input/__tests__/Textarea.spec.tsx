import React from 'react';

import { render } from 'test/test-utils';

import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('should render correctly', () => {
    const { container } = render(<Textarea placeholder="placeholder" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with minRows & maxRows', () => {
    const { container } = render(
      <Textarea id="demo" placeholder="placeholder" rows={3} maxRows={6} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
