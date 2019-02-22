import React, { PureComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';

import tag from '../utils/CleanTag';

const rippleAnimation = keyframes`
  100% {
    opacity: 0;
    transform: scale(3);
  }
`;

const StyledRipple = styled(tag.div)<{ rippling: boolean }>`
  position: absolute;
  border-radius: 50%;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
  transform: scale(0);

  ${({ rippling }) =>
    rippling &&
    css`
      animation: ${rippleAnimation} 0.5s linear;
    `};
`;

class Ripple extends PureComponent {
  state = {
    animate: false,
    styles: {},
  };

  rippling = (
    { clientX, clientY }: { clientX: number; clientY: number },
    button: HTMLButtonElement
  ) => {
    const cursorPos = {
      top: clientY,
      left: clientX,
    };

    const buttonPos = button.getBoundingClientRect();
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const rippleWidth = Math.max(buttonHeight, buttonWidth);
    const rippleRadius = rippleWidth / 2;

    this.setState({
      animate: true,
      styles: {
        width: rippleWidth,
        height: rippleWidth,
        top: cursorPos.top - buttonPos.top - rippleRadius,
        left: cursorPos.left - buttonPos.left - rippleRadius,
      },
    });
  };

  startRipple = ({ clientX, clientY }: any, buttonRef: HTMLButtonElement) => {
    const rippling = () => {
      this.rippling({ clientX, clientY }, buttonRef);
    };

    if (this.state.animate) {
      this.setState({ animate: false }, rippling);
    } else {
      rippling();
    }
  };

  render() {
    const { animate, styles } = this.state;
    return <StyledRipple rippling={animate} style={styles} />;
  }
}

export default Ripple;