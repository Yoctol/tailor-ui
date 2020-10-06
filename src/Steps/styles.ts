import styled, { css } from 'styled-components';

import { Colors, Direction, Status } from './StepContext';

export interface StepsItemProps {
  status: Status;
  direction: Direction;
  isLast: boolean;
  tailColor: Colors | 'gray';
}

export const StepsIconItem = styled.div<StepsItemProps>`
  display: flex;
  position: relative;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border: ${(p) => p.theme.borders.base};
  border-radius: 50%;
  border-color: ${(p) => {
    switch (p.status) {
      case 'progress':
      case 'finish':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.danger;
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  background-color: ${(p) =>
    p.status === 'progress' ? p.theme.colors.primary : p.theme.colors.light};
  color: ${(p) => {
    switch (p.status) {
      case 'progress':
        return p.theme.colors.light;
      case 'finish':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.danger;
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  cursor: pointer;

  ${(p) =>
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

  ${(p) => p.theme.transition /* sc-declaration */};
`;

export const Title = styled.div<StepsItemProps>`
  display: inline-block;
  position: relative;
  align-items: center;
  height: 32px;
  padding-right: 16px;
  color: ${(p) => {
    switch (p.status) {
      case 'progress':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.danger;
      case 'finish':
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  line-height: 32px;

  ${(p) =>
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

  ${(p) => p.theme.transition /* sc-declaration */};
`;

export interface DescriptionProps {
  direction: Direction;
  status: Status;
}

export const Description = styled.div<DescriptionProps>`
  padding-bottom: ${(p) => p.direction === 'vertical' && '12px'};
  color: ${(p) => {
    switch (p.status) {
      case 'progress':
        return p.theme.colors.primary;
      case 'error':
        return p.theme.colors.danger;
      case 'finish':
      case 'wait':
      default:
        return p.theme.colors.gray500;
    }
  }};
  font-size: ${(p) => p.theme.fontSizes.sm};
  ${(p) => p.theme.transition /* sc-declaration */};
`;
