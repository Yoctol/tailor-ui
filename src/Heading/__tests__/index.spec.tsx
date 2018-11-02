import React from 'react';

import { render } from 'test/test-utils';

import Heading from '..';

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

  it('should render gray heading', () => {
    const { container } = render(<Heading.h1 gray>H1 Heading 28px</Heading.h1>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render grayLight heading', () => {
    const { container } = render(
      <Heading.h1 grayLight>H1 Heading 28px</Heading.h1>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render grayHint heading', () => {
    const { container } = render(
      <Heading.h1 grayHint>H1 Heading 28px</Heading.h1>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render white heading', () => {
    const { container } = render(
      <Heading.h1 white>H1 Heading 28px</Heading.h1>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});