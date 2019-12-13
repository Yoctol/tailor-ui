import React, { FC, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { Box } from '../Layout';
import { Icon } from '../Icon';
import { Position } from '../constants';
import { StyledPopover } from '../Popover/styles';
import { Tooltip } from '../Tooltip';

import { Item, List } from './styles';

interface DropdownSubListProps {
  title: string;
  disabled?: boolean;
}

const DropdownSubListWrapper: FC = props => <StyledPopover p="0" {...props} />;

const DropdownSubList: FC<DropdownSubListProps> = ({
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
