import React, { FC, useContext } from 'react';
import { MdClose, MdDone } from 'react-icons/md';

import { Flex } from '../Layout';
import { Icon } from '../Icon';

import StepContext, { Status } from './StepContext';
import { Description, StepsIconItem, StepsItemProps, Title } from './styles';

type StepIconProps = StepsItemProps & {
  count: number;
  onClick: () => void;
};

const StepIcon: FC<StepIconProps> = ({
  status,
  count,
  isLast,
  direction,
  tailColor,
  onClick,
}) => {
  const isFinish = status === 'finish';
  const renderIcon = ['finish', 'error'].includes(status);

  return (
    <StepsIconItem
      status={status}
      isLast={isLast}
      direction={direction}
      tailColor={tailColor}
      onClick={onClick}
    >
      {renderIcon ? (
        <Icon
          size="20"
          type={isFinish ? MdDone : MdClose}
          fill={isFinish ? 'primary' : 'error'}
          style={{ pointerEvents: 'none' }}
        />
      ) : (
        count + 1
      )}
    </StepsIconItem>
  );
};

export interface StepProps {
  title: string;
  description?: string;
  status?: Status;
}

const Step: FC<StepProps> = ({ title, description = null }) => {
  const {
    count,
    status,
    isLast,
    tailColor,
    direction,
    onCurrentChange,
  } = useContext(StepContext);
  return (
    <Flex
      flex={isLast ? 'none' : 'auto'}
      mr="16px"
      mb={direction === 'vertical' ? '6px' : 0}
      overflow="hidden"
      minHeight={direction === 'vertical' ? '64px' : 'auto'}
    >
      <StepIcon
        status={status}
        count={count}
        isLast={isLast}
        direction={direction}
        tailColor={tailColor}
        onClick={() => {
          if (onCurrentChange) {
            onCurrentChange(count);
          }
        }}
      />
      <div>
        <Title
          status={status}
          direction={direction}
          isLast={isLast}
          tailColor={tailColor}
        >
          {title}
        </Title>
        {description && (
          <Description status={status} direction={direction}>
            {description}
          </Description>
        )}
      </div>
    </Flex>
  );
};

export default Step;
