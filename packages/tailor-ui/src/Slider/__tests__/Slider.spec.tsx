import React from 'react';

import { render } from 'test/test-utils';

import { Slider } from '../Slider';

describe('Slider', () => {
  it('should render slider correctly', () => {
    const { container } = render(<Slider defaultValue={30} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render range slider correctly', () => {
    const { container } = render(<Slider range defaultValue={[30, 60]} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render customize min & max slider correctly', () => {
    const { container } = render(
      <>
        <Slider min={100} max={200} value={130} />
        <Slider min={120} max={400} range defaultValue={[240, 300]} />
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled slider correctly', () => {
    const { container } = render(
      <>
        <Slider disabled defaultValue={30} />
        <Slider disabled range defaultValue={[30, 60]} />
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
