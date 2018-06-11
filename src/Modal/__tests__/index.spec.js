import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Modal from '../';

describe('Modal', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(<Modal show handleClose={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('should render with props closeButton', () => {
    const component = mountWithTheme(
      <Modal show closeButton handleClose={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });
});
