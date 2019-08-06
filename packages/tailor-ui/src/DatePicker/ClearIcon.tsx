import React, { FC } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { Icon } from '../Icon';

interface ClearIconProps {
  onClick: () => void;
}

const ClearIconWrapper = styled.div`
  display: inline-flex;
  flex: none;

  &:hover svg {
    fill: ${p => p.theme.colors.primary} !important;
  }
`;

// FIXME: refactor with ClearIcon from lab/select
const ClearIcon: FC<ClearIconProps> = ({ onClick }) => (
  <ClearIconWrapper>
    <Icon
      type={MdClose}
      fill="gray400"
      size="20"
      cursor="pointer"
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    />
  </ClearIconWrapper>
);

export default ClearIcon;
