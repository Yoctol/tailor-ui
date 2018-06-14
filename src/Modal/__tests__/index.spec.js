import React from 'react';

import shallowWithTheme from 'test/shallowWithTheme';

import Modal from '../';

describe('Modal', () => {
  it('should render correctly', () => {
    const component = shallowWithTheme(<Modal show handleClose={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('should render with props closeButton', () => {
    const component = shallowWithTheme(
      <Modal show closeButton handleClose={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });
});
