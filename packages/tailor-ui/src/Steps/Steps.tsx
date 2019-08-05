import React, {
  Children,
  FC,
  ReactElement,
  ReactNode,
  isValidElement,
} from 'react';

import { Flex } from '../Layout';

import Step, { StepProps } from './Step';
import StepContext, { Direction, Status } from './StepContext';

const getStatus = ({ current, count }: { current: number; count: number }) => {
  if (current === count) {
    return 'progress';
  }
  if (current > count) {
    return 'finish';
  }
  if (current < count) {
    return 'wait';
  }

  return 'progress';
};

const getTailColor = ({
  count,
  status,
  steps,
}: {
  count: number;
  status: Status;
  steps: ReactNode[];
}) => {
  const nextStep = steps[count + 1];
  if (
    isValidElement<StepProps>(nextStep) &&
    nextStep.props.status === 'error'
  ) {
    return 'error';
  }

  if (status === 'progress' || status === 'wait') {
    return 'gray';
  }

  return 'primary';
};

export interface StepsProps {
  current: number;
  direction?: Direction;
  onCurrentChange?: () => void;
  children: ReactElement<StepProps>[];
}

const Steps: FC<StepsProps> & {
  Step: typeof Step;
} = ({
  children,
  current,
  onCurrentChange,
  direction = 'horizontal' as Direction,
}) => {
  const totalCount = Children.count(children) - 1;
  const steps = Children.toArray(children);

  return (
    <Flex flexDirection={direction === 'horizontal' ? 'row' : 'column'}>
      {steps.map((step, count) => {
        if (isValidElement<StepProps>(step)) {
          const status = step.props.status || getStatus({ current, count });
          const isLast = count === totalCount;
          const tailColor = getTailColor({ count, status, steps });

          return (
            <StepContext.Provider
              key={step.key || count}
              value={{
                count,
                status,
                isLast,
                tailColor,
                direction,
                onCurrentChange,
              }}
            >
              {step}
            </StepContext.Provider>
          );
        }

        return null;
      })}
    </Flex>
  );
};

Steps.Step = Step;

export { Steps };
