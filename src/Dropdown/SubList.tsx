import React, { PureComponent } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { findDOMNode } from 'react-dom';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Icon from '../Icon';

import Item from './Item';
import { StyledList, StyledListProps } from './List';

const SubListWrapper = styled(tag.div)`
  position: absolute;
  top: calc(-${p => p.theme.space[2]} - ${p => p.theme.space[1]});
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

export interface ISubItemProps extends StyledListProps {
  title: string;
  disabled?: boolean;
}

export interface ISubItemState {
  subItemEl: HTMLElement | null;
}

class SubItem extends PureComponent<ISubItemProps, ISubItemState> {
  subItemRef: any;

  state: ISubItemState = {
    subItemEl: null,
  };

  handleSubItemRef = (subItemRef: any) => {
    this.subItemRef = subItemRef;
  };

  componentDidMount() {
    const subItemEl = findDOMNode(this.subItemRef) as HTMLElement;

    this.setState(() => ({ subItemEl }));
  }

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
      <StyledSubItem disabled={disabled} ref={this.handleSubItemRef}>
        {title}
        <Icon ml="2" size="16" cursor="pointer" type={MdKeyboardArrowRight} />

        <SubListWrapper style={{ left: this.getOffsetLeft() }}>
          <StyledList {...props}>{children}</StyledList>
        </SubListWrapper>
      </StyledSubItem>
    );
  }
}

export default SubItem;
