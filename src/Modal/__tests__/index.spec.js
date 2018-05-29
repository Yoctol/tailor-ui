import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../';

describe('Modal', () => {
  it('should render correctly', () => {
    const component = shallow(<Modal show handleClose={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('should render with props closeButton', () => {
    const component = shallow(
      <Modal show closeButton handleClose={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });
});
