import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimationCircle1 = (primaryLight: string) => keyframes`
  0% {
    transform: scale(0.36, 0.36) translate(0, -90%);
  }

  33% {
    background-color: ${primaryLight};
    transform: scale(0.36, 0.36) translate(-80%, 60%);
  }

  50% {
    background-color: ${primaryLight};
    transform: scale(0.18, 0.18) translate(0, 60%);
  }

  66% {
    transform: scale(0.36, 0.36) translate(80%, 60%);
  }

  100% {
    transform: scale(0.36, 0.36) translate(0, -90%);
  }
`;

const spinAnimationCircle2 = (primaryLight: string) => keyframes`
  0% {
    transform: scale(0.36, 0.36) translate(-80%, 60%);
  }

  33% {
    background-color: ${primaryLight};
    transform: scale(0.36, 0.36) translate(80%, 60%);
  }

  50% {
    background-color: ${primaryLight};
    transform: scale(0.18, 0.18) translate(45%, -20%);
  }

  66% {
    transform: scale(0.36, 0.36) translate(0, -90%);
  }

  100% {
    transform: scale(0.36, 0.36) translate(-80%, 60%);
  }
`;

const spinAnimationCircle3 = (primaryLight: string) => keyframes`
  0% {
    transform: scale(0.36, 0.36) translate(80%, 60%);
  }

  33% {
    background-color: ${primaryLight};
    transform: scale(0.36, 0.36) translate(0, -90%);
  }

  50% {
    background-color: ${primaryLight};
    transform: scale(0.18, 0.18) translate(-45%, -20%);
  }

  66% {
    transform: scale(0.36, 0.36) translate(-80%, 60%);
  }

  100% {
    transform: scale(0.36, 0.36) translate(80%, 60%);
  }
`;

interface SpinCircleWrapperProps {
  size: number | string;
}

const BaseSpinCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${p => p.theme.colors.primary};
`;

const SpinCircle1 = styled(BaseSpinCircle)`
  animation: ${p => spinAnimationCircle1(p.theme.colors.primaryLight)} 1.5s
    infinite linear both;
`;

const SpinCircle2 = styled(BaseSpinCircle)`
  animation: ${p => spinAnimationCircle2(p.theme.colors.primaryLight)} 1.5s
    infinite linear both;
`;

const SpinCircle3 = styled(BaseSpinCircle)`
  animation: ${p => spinAnimationCircle3(p.theme.colors.primaryLight)} 1.5s
    infinite linear both;
`;

const SpinCircleWrapper = styled.div<SpinCircleWrapperProps>`
  position: relative;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`;

const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

interface SpinProps {
  size?: number | string;
  fullscreen?: boolean;
  bg?: string;
}

const Spin: FC<SpinProps> = ({ size = 40 }) => {
  return (
    <SpinWrapper>
      <SpinCircleWrapper size={size}>
        <SpinCircle1 />
        <SpinCircle2 />
        <SpinCircle3 />
      </SpinCircleWrapper>
    </SpinWrapper>
  );
};

export { Spin };
