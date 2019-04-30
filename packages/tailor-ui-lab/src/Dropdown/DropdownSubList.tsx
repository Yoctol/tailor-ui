import React, { FunctionComponent, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { Box, Icon, Position } from 'tailor-ui';

import Tooltip from '../Tooltip';
import { StyledPopover } from '../Popover/styles';

import { Item, List } from './styles';

interface DropdownSubListProps {
  title: string;
  /**
   * Disabled the item
   */
  disabled?: boolean;
}

const DropdownSubListWrapper: FunctionComponent = props => (
  <StyledPopover p="0" {...props} />
);

const DropdownSubList: FunctionComponent<DropdownSubListProps> = ({
  disabled = false,
  title,
  children,
  ...otherProps
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      position={Position.RIGHT}
      visible={visible}
      mouseEnterDelay={200}
      mouseLeaveDelay={300}
      Wrapper={DropdownSubListWrapper}
      content={<List onClick={() => setVisible(false)}>{children}</List>}
      onVisibleChange={newVisible => {
        if (!disabled) {
          setVisible(newVisible);
        }
      }}
    >
      <Item disabled={disabled} {...otherProps}>
        {title}
        <Box display="inline-flex" ml="auto" pl="2">
          <Icon cursor="pointer" type={MdKeyboardArrowRight} />
        </Box>
      </Item>
    </Tooltip>
  );
};

export default DropdownSubList;
