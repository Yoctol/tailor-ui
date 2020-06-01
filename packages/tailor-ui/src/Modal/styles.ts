import styled from 'styled-components';

import { StatusType } from '../types';

import { ModalSize } from './types';

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
`;

export const ModalStatusBar = styled.div<{ status: StatusType }>`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 48px;
  border-radius: ${(p) => p.theme.radii.xl};
  background-color: ${(p) => {
    switch (p.status) {
      case 'info':
        return p.theme.colors.primary;
      case 'success':
        return p.theme.colors.success;
      case 'warning':
        return p.theme.colors.warning;
      case 'error':
        return p.theme.colors.danger;
      default:
        return '';
    }
  }};
`;

export const ModalContent = styled.div<{ size: ModalSize }>`
  display: flex;
  flex-direction: column;
  width: ${(p) => ({ md: 516, lg: 786 }[p.size] || 516)}px;
  max-width: 90vw;
  min-height: 220px;
  max-height: 75vh;
  padding: 24px ${(p) => p.theme.space[3]} ${(p) => p.theme.space[3]};
  border-radius: ${(p) => p.theme.radii.xl};
  background-color: #fff;

  @media screen and (max-width: 36rem) {
    width: calc(100vw - 32px);
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 132px);
  }
`;

export const CloseButtonWrapper = styled.div`
  background: transparent;
  transform: rotate(0deg);
  transition: all 0.2s ease-in;

  :hover {
    transform: rotate(90deg);
  }
`;
