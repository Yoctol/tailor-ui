import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';

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

const StyledSubItem = styled(Item)<any>`
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

export interface SubItemProps extends StyledListProps {
  title: string;
  disabled?: boolean;
}

export interface SubItemState {
  subItemEl: HTMLElement | null;
}

const SubItem: FunctionComponent<SubItemProps> = ({
  title,
  children,
  disabled,
  ...props
}) => {
  const subItemRef = useRef<any>(null);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (subItemRef.current) {
      setLeft(subItemRef.current.offsetWidth);
    }
  });

  return (
    <StyledSubItem disabled={disabled} ref={subItemRef}>
      {title}
      <Icon ml="2" size="16" cursor="pointer" type={MdKeyboardArrowRight} />

      <SubListWrapper style={{ left }}>
        <StyledList {...props}>{children}</StyledList>
      </SubListWrapper>
    </StyledSubItem>
  );
};

export default SubItem;
