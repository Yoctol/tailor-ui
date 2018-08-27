import ErrorIcon from 'react-icons/lib/md/close';
import FinishIcon from 'react-icons/lib/md/done';
import PropTypes from 'prop-types';
import React, { Children, createContext } from 'react';
import styled, { css } from 'styled-components';

import Flex from '../Grid/Flex';
import Icon from '../Icon';

const { Provider, Consumer } = createContext();

const statusType = PropTypes.oneOf(['finish', 'progress', 'wait', 'error']);

const StepsIconItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border: ${p => p.theme.borders.default};
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
        return p.theme.colors.gray[5];
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
        return p.theme.colors.gray[5];
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
          ? p.theme.colors.gray[5]
          : p.theme.colors[p.tailColor]};
      }
    `};

  ${p => p.theme.transition /* sc-declaration */};
`;

const Title = styled.div`
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
        return p.theme.colors.gray[5];
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
          ? p.theme.colors.gray[5]
          : p.theme.colors[p.tailColor]};
      }
    `};

  ${p => p.theme.transition /* sc-declaration */};
`;

const Description = styled.div`
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
        return p.theme.colors.gray[5];
    }
  }};
  font-size: ${p => p.theme.fontSizes.sm};
  ${p => p.theme.transition /* sc-declaration */};
`;

const getStatus = ({ current, count }) => {
  if (current === count) {
    return 'progress';
  }
  if (current > count) {
    return 'finish';
  }
  if (current < count) {
    return 'wait';
  }
};

const getTailColor = ({ count, status, steps }) => {
  if (steps[count + 1] && steps[count + 1].props.status === 'error') {
    return 'error';
  }
  if (status === 'progress' || status === 'wait') {
    return 'gray';
  }
  return 'primary';
};

const StepIcon = ({ status, count, isLast, direction, tailColor, onClick }) => {
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
          type={isFinish ? FinishIcon : ErrorIcon}
          fill={isFinish ? 'primary' : 'error'}
          style={{ pointerEvents: 'none' }}
        />
      ) : (
        count + 1
      )}
    </StepsIconItem>
  );
};

StepIcon.propTypes = {
  count: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  isLast: PropTypes.bool.isRequired,
  status: statusType.isRequired,
  tailColor: PropTypes.oneOf(['primary', 'error', 'gray']).isRequired,
  onClick: PropTypes.func.isRequired,
};

export const Step = ({ title, description }) => (
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
          onClick={() => onCurrentChange(count)}
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

Step.propTypes = {
  /**
   * description of the step, optional property
   */
  description: PropTypes.string,
  /**
   * to specify the status. It will be automatically set by current of Steps
   * if not configured. Optional values are: `wait` `process` `finish` `error`
   */
  // eslint-disable-next-line react/no-unused-prop-types
  status: statusType,
  /**
   * title of the step
   */
  title: PropTypes.string.isRequired,
};

Step.defaultProps = {
  description: '',
  status: null,
};

const Steps = ({ children, current, direction, onCurrentChange }) => {
  const totalCount = Children.count(children) - 1;
  const steps = Children.toArray(children);

  return (
    <Flex flexDirection={direction === 'horizontal' ? 'row' : 'column'}>
      {steps.map((step, count) => {
        const status = step.props.status || getStatus({ current, count });
        const isLast = count === totalCount;
        const tailColor = getTailColor({ count, status, steps });

        return (
          <Provider
            key={step.key}
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
      })}
    </Flex>
  );
};

Steps.propTypes = {
  /**
   * Step component of Steps.
   */
  children: PropTypes.node.isRequired,
  /**
   * to set the current step, counting from 0. You can overwrite this state by using `status` of `Step`
   */
  current: PropTypes.number.isRequired,
  /**
   * to specify the direction of the step bar, `horizontal` and `vertical` are currently supported
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  onCurrentChange: PropTypes.func,
};

Steps.defaultProps = {
  direction: 'horizontal',
  onCurrentChange: () => {},
};

Steps.Step = Step;

export default Steps;
