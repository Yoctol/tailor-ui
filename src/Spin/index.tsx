import React, { SFC } from 'react';

import styled, { css, keyframes } from 'utils/styled-components';
import tag from 'utils/CleanTag';

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

interface ISpinCubeWrapperProps {
  size: number | string;
}

const SpinCube = styled(tag.div)`
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

const SpinCubeWrapper = styled<ISpinCubeWrapperProps>(tag.div)`
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

interface ISpinWrapperProps {
  fullscreen: boolean;
}

const SpinWrapper = styled<ISpinWrapperProps>(tag.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  ${p =>
    p.fullscreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
    `}
`;

interface ISpinProps {
  size?: number | string;
  fullscreen?: boolean;
}

const Spin: SFC<ISpinProps> = ({ size = 40, fullscreen = false }) => (
  <SpinWrapper fullscreen={fullscreen}>
    <SpinCubeWrapper size={size}>
      <SpinCube />
      <SpinCube />
      <SpinCube />
      <SpinCube />
    </SpinCubeWrapper>
  </SpinWrapper>
);

export default Spin;
