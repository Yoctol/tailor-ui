import React from 'react';

import { render } from 'test/test-utils';

import Heading from '../Heading';

describe('Heading', () => {
  it('should default export h1 ~ h6', () => {
    expect(Heading.h1).toBeDefined();
    expect(Heading.h2).toBeDefined();
    expect(Heading.h3).toBeDefined();
    expect(Heading.h4).toBeDefined();
    expect(Heading.h5).toBeDefined();
    expect(Heading.h6).toBeDefined();
  });

  it('should render correctly', () => {
    const { container } = render(
      <div>
        <Heading.h1>H1 Heading 28px</Heading.h1>
        <Heading.h2>H2 Heading 26px</Heading.h2>
        <Heading.h3>H3 Heading 18px</Heading.h3>
        <Heading.h4>H4 Heading 16px</Heading.h4>
        <Heading.h5>H5 Heading 14px</Heading.h5>
        <Heading.h6>H6 Heading 12px</Heading.h6>
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render different color heading', () => {
    const { container } = render(
      <Heading.h1 color="gray400">H1 Heading</Heading.h1>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <>
        <Heading.h1 data-testid="h1">H1 Heading</Heading.h1>
        <Heading.h2 data-testid="h2">H2 Heading</Heading.h2>
        <Heading.h3 data-testid="h3">H3 Heading</Heading.h3>
        <Heading.h4 data-testid="h4">H4 Heading</Heading.h4>
        <Heading.h5 data-testid="h5">H5 Heading</Heading.h5>
        <Heading.h6 data-testid="h6">H6 Heading</Heading.h6>
      </>
    );

    expect(getByTestId('h1')).toHaveTextContent('H1 Heading');
    expect(getByTestId('h2')).toHaveTextContent('H2 Heading');
    expect(getByTestId('h3')).toHaveTextContent('H3 Heading');
    expect(getByTestId('h4')).toHaveTextContent('H4 Heading');
    expect(getByTestId('h5')).toHaveTextContent('H5 Heading');
    expect(getByTestId('h6')).toHaveTextContent('H6 Heading');
  });
});
