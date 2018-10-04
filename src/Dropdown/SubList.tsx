import ArrowIcon from 'react-icons/lib/md/keyboard-arrow-right';
import React, { PureComponent } from 'react';

import styled from 'utils/styled-components';

import Icon from '../Icon';

import Item from './Item';
import { StyledList } from './List';

interface SubListWrapperProps {
  offsetLeft: number;
}

const SubListWrapper = styled<SubListWrapperProps, 'div'>('div')`
  position: absolute;
  top: 0;
  left: ${p => p.theme.space[1]};
  padding-left: ${p => p.offsetLeft}px;
  opacity: 0;
  transform: scale(0.3);
  transform-origin: ${p => p.offsetLeft}px top;
  cursor: pointer;

  ${p => p.theme.transition};

  > ${StyledList /* sc-selector */} {
    position: unset;
  }
`;

const StyledSubItem = styled(Item)`
  position: relative;
  flex-direction: row;
  align-items: center;

  &:hover {
    > ${SubListWrapper /* sc-selector */} {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export interface SubItemProps {
  title: string;
  disabled?: boolean;
}

export interface SubItemState {
  subItemEl: HTMLElement | null;
}

class SubItem extends PureComponent<SubItemProps, SubItemState> {
  state: SubItemState = {
    subItemEl: null,
  };

  subItemRef = (subItemEl: HTMLElement) => {
    this.setState(() => ({ subItemEl }));
  };

  getOffsetLeft = () => {
    const { subItemEl } = this.state;

    if (!subItemEl) {
      return 0;
    }

    return subItemEl.offsetWidth;
  };

  render() {
    const { title, children, disabled, ...props } = this.props;

    return (
      <StyledSubItem disabled={disabled} innerRef={this.subItemRef}>
        {title}
        <Icon ml="2" size="16" cursor="pointer" type={ArrowIcon} />

        <SubListWrapper offsetLeft={this.getOffsetLeft()}>
          <StyledList {...props}>{children}</StyledList>
        </SubListWrapper>
      </StyledSubItem>
    );
  }
}

export default SubItem;
