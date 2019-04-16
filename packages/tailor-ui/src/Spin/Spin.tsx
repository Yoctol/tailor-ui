import React, { FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ColorProps, color } from 'styled-system';
import { animated, useTransition } from 'react-spring';

import Portal from '../Portal';

const spinAnimation = keyframes`
  0%, 10% {
    opacity: 0;
    transform: perspective(140px) rotateX(-180deg);
  }

  25%, 75% {
    opacity: 1;
    transform: perspective(140px) rotateX(0deg);
  }

  90%, 100% {
    opacity: 0;
    transform: perspective(140px) rotateY(180deg);
  }
`;

interface SpinCubeWrapperProps {
  size: number | string;
}

const SpinCube = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  float: left;
  transform: scale(1.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.colors.primaryDark};
    transform-origin: 100% 100%;
    animation: ${spinAnimation} 2.4s infinite linear both;
  }
`;

const SpinCubeWrapper = styled.div<SpinCubeWrapperProps>`
  position: relative;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  transform: rotateZ(45deg);

  ${SpinCube /* sc-selector */}:nth-child(2) {
    transform: scale(1.1) rotateZ(90deg);

    &::before {
      animation-delay: 0.3s;
    }
  }

  ${SpinCube /* sc-selector */}:nth-child(4) {
    transform: scale(1.1) rotateZ(180deg);

    &::before {
      animation-delay: 0.6s;
    }
  }

  ${SpinCube /* sc-selector */}:nth-child(3) {
    transform: scale(1.1) rotateZ(270deg);

    &::before {
      animation-delay: 0.9s;
    }
  }
`;

type SpinWrapperProps = ColorProps & {
  fullscreen: boolean;
};

const SpinWrapper = styled.div<SpinWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  ${p =>
    p.fullscreen &&
    css`
      position: fixed;
      z-index: 10099;
      top: 0;
      left: 0;

      ${color}
    `}
`;

const AnimatedSpinWrapper = animated(SpinWrapper);

interface SpinProps {
  size?: number | string;
  fullscreen?: boolean;
  bg?: string;
}

const Spin: FunctionComponent<SpinProps> = ({
  size = 40,
  fullscreen = false,
  bg = 'gray100',
}) => {
  // only mount transition so destructure it
  const [{ props }] = useTransition(true, null, {
    from: {
      opacity: 0.1,
    },
    enter: {
      opacity: 0.9,
    },
  });

  const spinComponent = (
    <AnimatedSpinWrapper fullscreen={fullscreen} bg={bg} style={props}>
      <SpinCubeWrapper size={size}>
        <SpinCube />
        <SpinCube />
        <SpinCube />
        <SpinCube />
      </SpinCubeWrapper>
    </AnimatedSpinWrapper>
  );

  if (fullscreen) {
    return <Portal>{spinComponent}</Portal>;
  }

  return spinComponent;
};

export default Spin;
