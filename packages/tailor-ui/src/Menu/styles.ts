import styled, { css } from 'styled-components';

import tag from '../utils/CleanTag';

export interface StyledItemProps {
  active?: boolean;
}

export const StyledSubMenu = styled(tag.div)<StyledItemProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 16px 14px;
  background-color: ${p => p.theme.colors.primaryDark2};
  color: ${p => p.theme.colors.primaryLight};
  font-size: ${p => p.theme.fontSizes.lg};
  cursor: pointer;

  svg {
    fill: ${p => p.theme.colors.primaryLight};
  }

  ${({ active }) =>
    active &&
    css`
      color: ${p => p.theme.colors.light};

      svg {
        fill: ${p => p.theme.colors.light};
      }
    `};

  &:hover {
    color: ${p => p.theme.colors.light};

    svg {
      fill: ${p => p.theme.colors.light};
    }
  }

  ${p => p.theme.transition};
`;

export const StyledItem = styled(tag.div)`
  display: inline-flex;
  flex: auto;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  background-color: ${p => p.theme.colors.primaryDark2};
  color: ${p => p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.base};
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  ${p => p.theme.transition};
`;

export const StyledItemBadge = styled(tag.div)`
  width: 8px;
  height: 100%;
  margin-right: 22px;
  border-radius: 16px;
  background-color: ${p => p.theme.colors.primaryDark2};
  list-style: none;

  ${p => p.theme.transition};
`;

export const StyledItemBox = styled(tag.div)`
  display: flex;
  height: 48px;
  padding: 0 8px;
  background-color: ${p => p.theme.colors.primaryDark2};

  ${({ active }) =>
    active &&
    css`
      color: ${p => p.theme.colors.secondary};

      ${StyledItem} {
        color: ${p => p.theme.colors.secondary};
      }

      ${StyledItemBadge} {
        background-color: ${p => p.theme.colors.secondary};
      }
    `};

  &:hover {
    ${StyledItem} {
      background-color: ${p => p.theme.colors.primaryDark};
    }

    ${StyledItemBadge} {
      background-color: ${p =>
        p.active ? p.theme.colors.secondary : p.theme.colors.primaryDark};
    }
  }

  ${p => p.theme.transition};
`;