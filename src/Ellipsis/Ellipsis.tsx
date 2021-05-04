import React, { FC, useRef } from 'react';
import styled from 'styled-components';

import { Box } from '../Layout';
import { Position } from '../constants';
import { Tooltip, TooltipProps } from '../Tooltip';

const EllipsisText = styled.div`
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface EllipsisProps {
  tooltipProps?: TooltipProps;
}

const Ellipsis: FC<EllipsisProps> = ({
  children,
  tooltipProps = {},
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const isTextOverflow = ref.current
    ? ref.current.scrollWidth > ref.current.offsetWidth
    : false;

  const Content = (
    <EllipsisText ref={ref} {...props}>
      {children}
    </EllipsisText>
  );

  return isTextOverflow ? (
    <Tooltip
      content={
        <Box
          minWidth="200px"
          maxWidth="280px"
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
        >
          {children}
        </Box>
      }
      position={Position.BOTTOM}
      mouseLeaveDelay={0}
      {...tooltipProps}
    >
      {Content}
    </Tooltip>
  ) : (
    Content
  );
};

export { Ellipsis };
