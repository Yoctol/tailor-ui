// eslint
import React from 'react';

import { render } from 'test/test-utils';

import Divider from '..';

describe('Divider', () => {
  it('should render correctly', () => {
    const { container } = render(
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
        merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
        quo modo.
        <Divider />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
        merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
        quo modo.
        <Divider>With Text</Divider>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
        merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
        quo modo.
        <Divider dashed />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
        merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
        quo modo.
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correct with type vertical', () => {
    const { container } = render(
      <div>
        Text
        <Divider type="vertical" />
        {/* eslint-disable-next-line */}
        <a href="#">Link</a>
        <Divider type="vertical" />
        {/* eslint-disable-next-line */}
        <a href="#">Link</a>
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correct with orientation', () => {
    const { container } = render(
      <div>
        <Divider orientation="left">Left Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi ista probare, quae sunt a te dicta? Refert
          tamen, quo modo.
        </p>
        <Divider orientation="right">Right Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi ista probare, quae sunt a te dicta? Refert
          tamen, quo modo.
        </p>
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
