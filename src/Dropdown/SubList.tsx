import ArrowIcon from 'react-icons/lib/md/keyboard-arrow-right';
import React, { PureComponent } from 'react';

import styled from 'utils/styled-components';

import Icon from '../Icon';

import Item from './Item';
import { StyledList } from './List';

export interface StyledSubItemProps {
  offsetLeft: number;
}

const StyledSubItem = styled<StyledSubItemProps, any>(Item)`
  position: relative;

  & > ${StyledList /* sc-selector */} {
    left: ${p => p.offsetLeft}px;
    margin-left: 3px;
    opacity: 0;
    transform: scale(0.3);
    transform-origin: left;
    ${p => p.theme.transition};
  }

  &:hover {
    ${StyledList /* sc-selector */} {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export interface SubItemProps {
  title: string;
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
    const { title, children, ...props } = this.props;

    return (
      <StyledSubItem
        innerRef={this.subItemRef}
        offsetLeft={this.getOffsetLeft()}
      >
        {title}
        <Icon ml="2" size="16" cursor="pointer" type={ArrowIcon} />
        <StyledList {...props}>{children}</StyledList>
      </StyledSubItem>
    );
  }
}

export default SubItem;
