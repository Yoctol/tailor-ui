import { animated } from 'react-spring/hooks';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Box from '../../Grid/Box';

const SubMenuWrapper = styled(tag.div)`
  position: absolute;
  left: 48px;
  flex-direction: column;
  height: 100%;
  background-color: ${p => p.theme.colors.primary};
`;

export const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

const SubMenuContentWrapper = styled(tag.div)`
  position: absolute;
  z-index: 1;
  left: 45px;
  flex-direction: column;
  width: 180px;
`;

export const AnimatedSubMenuContentWrapper = animated(SubMenuContentWrapper);

interface IStyledSubMenuProps {
  active?: boolean;
}

export const SubMenuBadge = styled(Box)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export const StyledSubMenu = styled<IStyledSubMenuProps, 'div'>(tag.div)`
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-left: 3px solid;
  border-color: transparent;
  background-color: ${p => p.theme.colors.primaryDark};
  color: white;

  ${p =>
    p.active &&
    css`
      background-color: ${p.theme.colors.primary};
      border-color: ${p.theme.colors.secondaryLight};
    `}

  ${p => p.theme.transition};
`;

interface IStyledMenuItemProps {
  active?: boolean;
}

export const StyledMenuItem = styled<IStyledMenuItemProps, 'div'>(tag.div)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 ${p => p.theme.space[3]};
  color: ${p => p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.base};
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.primaryLight};
  }

  ${({ active }) =>
    active &&
    css`
      color: ${p => p.theme.colors.secondaryLight};
    `};
`;
