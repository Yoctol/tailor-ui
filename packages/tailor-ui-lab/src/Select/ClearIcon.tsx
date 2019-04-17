import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { Icon } from 'tailor-ui';

interface ClearIconProps {
  clearSelection: () => void;
}

const ClearIconWrapper = styled.div`
  display: inline-flex;
  flex: none;

  &:hover svg {
    fill: ${p => p.theme.colors.gray700} !important;
  }
`;

const ClearIcon: FunctionComponent<ClearIconProps> = ({ clearSelection }) => (
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
    />
  </ClearIconWrapper>
);

export default ClearIcon;
