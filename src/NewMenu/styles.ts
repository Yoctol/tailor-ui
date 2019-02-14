import styled from 'styled-components';
import { animated } from 'react-spring';

import tag from 'utils/CleanTag';

import Box from '../Grid/Box';

export const SubMenuWrapper = styled(animated.div)`
  position: absolute;
  left: 48px;
  flex-direction: column;
  height: 100%;
  background-color: ${p => p.theme.colors.primary};
  box-shadow: 4px 0 6px 0 rgba(94, 94, 94, 0.5);
`;

export const SubMenuContentWrapper = styled(animated.div)`
  position: absolute;
  z-index: 1;
  left: 45px;
  flex-direction: column;
  width: 180px;
`;

interface StyledSubMenuProps {
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

export const StyledSubMenu = styled(tag.div)<StyledSubMenuProps>`
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-right: 3px solid transparent;
  border-left: 3px solid
    ${p => (p.active ? p.theme.colors.secondaryLight : 'transparent')};
  background-color: ${p =>
    p.active ? p.theme.colors.primary : p.theme.colors.primaryDark};
  color: white;

  ${p => p.theme.transition};
`;

interface StyledMenuItemProps {
  active?: boolean;
}

export const StyledMenuItem = styled(tag.div)<StyledMenuItemProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 ${p => p.theme.space[3]};
  color: ${p =>
    p.active ? p.theme.colors.secondaryLight : p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.base};
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.primaryLight};
  }
`;
