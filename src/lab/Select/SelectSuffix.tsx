import React, { FC } from 'react';
import { MdClose, MdKeyboardArrowUp } from 'react-icons/md';

import { Icon } from '../../Icon';

import {
  ArrowIconWrapper,
  ClearIconWrapper,
  SelectLoading,
  SelectSuffixWrapper,
} from './styles';

interface SelectSuffixProps {
  loading: boolean;
  clearable: boolean;
  visible: boolean;
  hasSelectedItem: boolean;
  onClearIconClick: () => void;
}

const SelectSuffix: FC<SelectSuffixProps> = ({
  loading,
  clearable,
  onClearIconClick,
  hasSelectedItem,
  visible,
}) => {
  if (loading) {
    return <SelectLoading />;
  }

  return (
    <SelectSuffixWrapper>
      {clearable && hasSelectedItem && (
        <ClearIconWrapper>
          <Icon
            type={MdClose}
            fill="gray400"
            size="20"
            cursor="pointer"
            onClick={(event) => {
              event.stopPropagation();
              onClearIconClick();
            }}
          />
        </ClearIconWrapper>
      )}
      <ArrowIconWrapper visible={visible}>
        <Icon
          type={MdKeyboardArrowUp}
          size="20"
          fill="gray400"
          style={{ pointerEvents: 'none' }}
        />
      </ArrowIconWrapper>
    </SelectSuffixWrapper>
  );
};

export default SelectSuffix;
