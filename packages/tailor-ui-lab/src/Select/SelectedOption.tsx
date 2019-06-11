import React, { FunctionComponent } from 'react';
import { MdClose } from 'react-icons/md';

import { Icon } from 'tailor-ui';

import { StyledSelectedOption } from './styles';
import { getDataTestId } from './utils';

export interface SelectedOption {
  index: number;
  'data-testid'?: string;
}

const SelectedOption: FunctionComponent<SelectedOption> = ({
  children,
  index,
  ...props
}) => {
  return (
    <StyledSelectedOption {...getDataTestId(props, `selected-option-${index}`)}>
      {children}
      <Icon
        type={MdClose}
        size="16"
        cursor="pointer"
        ml="1"
        {...props}
        {...getDataTestId(props, `selected-option-${index}-clear-icon`)}
      />
    </StyledSelectedOption>
  );
};

export default SelectedOption;
