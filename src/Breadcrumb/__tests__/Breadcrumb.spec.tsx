import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb', () => {
  // FIXME: the jsdom does not render real dom
  // so we can not get element width to render hidden menu
  it('should render breadcrumb correctly', () => {
    const { container } = render(
      <Breadcrumb
        items={[
          {
            key: '1',
            name: '1',
          },
        ]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should trigger onClick correctly', async () => {
    const ref = createRef<HTMLDivElement>();
    const handleClick = jest.fn();

    render(
      <Breadcrumb
        ref={ref}
        items={[
          {
            key: '1',
            name: 'Click',
            onClick: handleClick,
          },
          {
            key: '2',
            name: 'Not clickable',
          },
        ]}
      />
    );

    const breadcrumb = await screen.findByText('Click');

    userEvent.click(breadcrumb);

    expect(handleClick).toBeCalled();
  });
});
