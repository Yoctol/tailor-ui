import React, { FC } from 'react';
import { MdClose } from 'react-icons/md';

import { Icon } from '../Icon';

import { StyledSelectedOption } from './styles';
import { getDataTestId } from './utils';

export interface SelectedOption {
  index: number;
  size: 'sm' | 'md' | 'lg';
  'data-testid'?: string;
}

const SelectedOption: FC<SelectedOption> = ({ children, index, ...props }) => {
  return (
    <StyledSelectedOption
      {...props}
      {...getDataTestId(props, `selected-option-${index}`)}
    >
      {children}
      <Icon
        type={MdClose}
        size="16"
        cursor="pointer"
        ml="1"
        {...getDataTestId(props, `selected-option-${index}-clear-icon`)}
      />
    </StyledSelectedOption>
  );
};

export default SelectedOption;
