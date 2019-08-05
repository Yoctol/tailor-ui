import React, { FC } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { Icon } from 'tailor-ui';

import { getDataTestId } from './utils';

interface ClearIconProps {
  clearSelection: () => void;
  'data-testid'?: string;
}

const ClearIconWrapper = styled.div`
  display: inline-flex;
  flex: none;

  &:hover svg {
    fill: ${p => p.theme.colors.gray700} !important;
  }
`;

const ClearIcon: FC<ClearIconProps> = ({ clearSelection, ...props }) => (
  <ClearIconWrapper>
    <Icon
      type={MdClose}
      fill="gray400"
      size="20"
      cursor="pointer"
      onClick={e => {
        e.stopPropagation();
        clearSelection();
      }}
      {...getDataTestId(props, 'clear-icon')}
    />
  </ClearIconWrapper>
);

export default ClearIcon;
