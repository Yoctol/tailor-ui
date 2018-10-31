import React, {
  Children,
  ReactChild,
  ReactElement,
  SFC,
  createContext,
  isValidElement,
} from 'react';
import { MdClose, MdDone } from 'react-icons/md';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Flex from '../Grid/Flex';
import Icon from '../Icon';
import theme from '../theme';

type Status = 'finish' | 'progress' | 'wait' | 'error';
type Direction = 'horizontal' | 'vertical';
type Colors = keyof typeof theme.colors;

const { Provider, Consumer } = createContext<{
  count: number;
  status: Status;
  isLast: boolean;
  tailColor: Colors;
  direction: Direction;
  onCurrentChange?: (count: number) => void;
}>({
  count: 0,
  status: 'wait',
  isLast: false,
  tailColor: 'gray',
  direction: 'horizontal',
  onCurrentChange: () => {},
});

interface IStepsItemProps {
  status: Status;
  direction: Direction;
  isLast: boolean;
  tailColor: Colors;
}

const StepsIconItem = styled<IStepsItemProps, 'div'>(tag.div)`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border: ${p => p.theme.borders.base};
  border-radius: 50%;
  border-color: ${p => {
    switch (p.status) {
      case 'progress':
      case 'finish':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.error;
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  background-color: ${p =>
    p.status === 'progress' ? p.theme.colors.primary : p.theme.colors.light};
  color: ${p => {
    switch (p.status) {
      case 'progress':
        return p.theme.colors.light;
      case 'finish':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.error;
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  cursor: pointer;

  ${p =>
    !p.isLast &&
    p.direction === 'vertical' &&
    css`
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 100%;
        left: 50%;
        width: 1px;
        height: 100%;
        margin-top: 6px;
        background: ${p.tailColor === 'gray'
          ? p.theme.colors.gray500
          : p.theme.colors[p.tailColor]};
      }
    `};

  ${p => p.theme.transition /* sc-declaration */};
`;

const Title = styled<IStepsItemProps, 'div'>(tag.div)`
  display: inline-block;
  position: relative;
  align-items: center;
  height: 32px;
  padding-right: 16px;
  color: ${p => {
    switch (p.status) {
      case 'progress':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.error;
      case 'finish':
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  line-height: 32px;

  ${p =>
    !p.isLast &&
    p.direction === 'horizontal' &&
    css`
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 16px;
        left: 100%;
        width: 9999px;
        height: 1px;
        background: ${p.tailColor === 'gray'
          ? p.theme.colors.gray500
          : p.theme.colors[p.tailColor]};
      }
    `};

  ${p => p.theme.transition /* sc-declaration */};
`;

interface IDescriptionProps {
  direction: Direction;
  status: Status;
}

const Description = styled<IDescriptionProps, 'div'>(tag.div)`
  padding-bottom: ${p => p.direction === 'vertical' && '12px'};
  color: ${p => {
    switch (p.status) {
      case 'progress':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.error;
      case 'finish':
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  font-size: ${p => p.theme.fontSizes.sm};
  ${p => p.theme.transition /* sc-declaration */};
`;

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
  steps: ReactChild[];
}) => {
  const nextStep = steps[count + 1];
  if (
    isValidElement<IStepProps>(nextStep) &&
    nextStep.props.status === 'error'
  ) {
    return 'error';
  }
  if (status === 'progress' || status === 'wait') {
    return 'gray';
  }
  return 'primary';
};

type StepIconProps = IStepsItemProps & {
  count: number;
  onClick: () => void;
};

const StepIcon: SFC<StepIconProps> = ({
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

export interface IStepProps {
  title: string;
  description?: string;
  status?: Status;
}

export const Step: SFC<IStepProps> = ({ title, description = null }) => (
  <Consumer>
    {({ count, status, isLast, tailColor, direction, onCurrentChange }) => (
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
    )}
  </Consumer>
);

export interface IStepsProps {
  current: number;
  direction?: Direction;
  onCurrentChange?: () => void;
  children: Array<ReactElement<IStepProps>>;
}

const Steps: SFC<IStepsProps> & {
  Step: typeof Step;
} = ({ children, current, onCurrentChange, direction = 'horizontal' }) => {
  const totalCount = Children.count(children) - 1;
  const steps = Children.toArray(children);

  return (
    <Flex flexDirection={direction === 'horizontal' ? 'row' : 'column'}>
      {steps.map((step, count) => {
        if (isValidElement<IStepProps>(step)) {
          const status = step.props.status || getStatus({ current, count });
          const isLast = count === totalCount;
          const tailColor = getTailColor({ count, status, steps });

          return (
            <Provider
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
            </Provider>
          );
        }

        return null;
      })}
    </Flex>
  );
};

Steps.Step = Step;

export default Steps;
