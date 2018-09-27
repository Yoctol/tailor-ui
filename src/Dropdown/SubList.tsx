import React, { PureComponent } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

import styled from 'utils/styled-components';

import Icon from '../Icon';

import Item from './Item';
import { StyledList } from './List';

interface ISubListWrapperProps {
  offsetLeft: number;
}

const SubListWrapper = styled<ISubListWrapperProps, 'div'>('div')`
  position: absolute;
  top: calc(-${p => p.theme.space[2]} - ${p => p.theme.space[1]});
  left: ${p => p.offsetLeft}px;
  padding: ${p => p.theme.space[2]};
  padding-left: ${p => p.theme.space[1]};
  opacity: 0;
  transform: scale(0.3);
  transform-origin: 0 ${p => p.theme.space[3]};
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

export interface ISubItemProps {
  title: string;
  disabled?: boolean;
}

export interface ISubItemState {
  subItemEl: HTMLElement | null;
}

class SubItem extends PureComponent<ISubItemProps, ISubItemState> {
  state: ISubItemState = {
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
      <StyledSubItem disabled={disabled} ref={this.subItemRef}>
        {title}
        <Icon ml="2" size="16" cursor="pointer" type={MdKeyboardArrowRight} />

        <SubListWrapper offsetLeft={this.getOffsetLeft()}>
          <StyledList {...props}>{children}</StyledList>
        </SubListWrapper>
      </StyledSubItem>
    );
  }
}

export default SubItem;
