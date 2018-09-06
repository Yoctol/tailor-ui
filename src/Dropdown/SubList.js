import ArrowIcon from 'react-icons/lib/md/keyboard-arrow-right';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

import Item from './Item';
import { StyledList } from './List';

const StyledSubItem = styled(Item)`
  position: relative;

  & > ${StyledList /* sc-selector */} {
    bottom: ${p => p.offset.bottom}px;
    left: ${p => p.offset.left}px;
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

class SubItem extends PureComponent {
  state = {
    subItemEl: null,
  };

  subItemRef = subItemEl => {
    this.setState(() => ({ subItemEl }));
  };

  getOffset = () => {
    const { subItemEl } = this.state;

    if (!subItemEl) {
      return 0;
    }

    return {
      left: subItemEl.offsetWidth + 5,
      bottom: -(subItemEl.offsetHeight + 10),
    };
  };

  render() {
    const { title, children, ...props } = this.props;

    return (
      <StyledSubItem innerRef={this.subItemRef} offset={this.getOffset()}>
        {title}
        <Icon ml="2" size="16" cursor="pointer" type={ArrowIcon} />
        <StyledList {...props}>{children}</StyledList>
      </StyledSubItem>
    );
  }
}

SubItem.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default SubItem;
