import React from 'react';

import { render } from 'test/test-utils';

import Heading from '../Heading';

describe('Heading', () => {
  it('should default export h1 ~ h6', () => {
    expect(Heading.H1).toBeDefined();
    expect(Heading.H2).toBeDefined();
    expect(Heading.H3).toBeDefined();
    expect(Heading.H4).toBeDefined();
    expect(Heading.H5).toBeDefined();
    expect(Heading.H6).toBeDefined();
  });

  it('should render correctly', () => {
    const { container } = render(
      <div>
        <Heading.H1>H1 Heading 28px</Heading.H1>
        <Heading.H2>H2 Heading 26px</Heading.H2>
        <Heading.H3>H3 Heading 18px</Heading.H3>
        <Heading.H4>H4 Heading 16px</Heading.H4>
        <Heading.H5>H5 Heading 14px</Heading.H5>
        <Heading.H6>H6 Heading 12px</Heading.H6>
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render different color heading', () => {
    const { container } = render(
      <Heading.H1 color="gray400">H1 Heading</Heading.H1>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <>
        <Heading.H1 data-testid="h1">H1 Heading</Heading.H1>
        <Heading.H2 data-testid="h2">H2 Heading</Heading.H2>
        <Heading.H3 data-testid="h3">H3 Heading</Heading.H3>
        <Heading.H4 data-testid="h4">H4 Heading</Heading.H4>
        <Heading.H5 data-testid="h5">H5 Heading</Heading.H5>
        <Heading.H6 data-testid="h6">H6 Heading</Heading.H6>
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
