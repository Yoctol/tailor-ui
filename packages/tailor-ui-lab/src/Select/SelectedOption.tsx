import React, { FunctionComponent } from 'react';
import { MdClose } from 'react-icons/md';

import { Icon } from 'tailor-ui';

import { StyledSelectedOption } from './styles';

const SelectedOption: FunctionComponent = ({ children, ...props }) => {
  return (
    <StyledSelectedOption>
      {children}
      <Icon type={MdClose} size="16" cursor="pointer" ml="1" {...props} />
    </StyledSelectedOption>
  );
};

export default SelectedOption;
