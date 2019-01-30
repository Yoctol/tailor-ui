import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react';

import Flex from '../Grid/Flex';
import Icon, { IconType } from '../Icon';
import Tooltip from '../Tooltip';

import MenuContext from './MenuContext';
import SubMenuContent from './SubMenuContent';
import { StyledSubMenu, SubMenuBadge } from './styles';

type Placement = 'top' | 'bottom';

interface ISubMenuProps {
  icon: IconType;
  id: string;
  title: string;
  placement?: Placement;
  header?: ReactNode;
  badge?: string;
}

const SubMenu: FunctionComponent<ISubMenuProps> = ({
  id,
  title,
  icon,
  badge,
  children,
  placement = 'top' as Placement,
  header,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const {
    subMenuVisible,
    activeSubId,
    setActiveSubId,
    subMenuContentSpringProps,
  } = useContext(MenuContext);

  const active = activeSubId === id;
  const contentVisible = active && subMenuVisible;

  return (
    <Tooltip
      light
      placement="right"
      content={title}
      visible={!contentVisible && tooltipVisible}
      onVisibleChange={visible => {
        if (!contentVisible) {
          setTooltipVisible(visible);
        }
      }}
    >
      <StyledSubMenu active={active}>
        <Flex
          width="48px"
          height="48px"
          alignItems="center"
          justifyContent="center"
          position="relative"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setTooltipVisible(false);
            setActiveSubId(id);
          }}
        >
          {badge && <SubMenuBadge bg={badge} />}
          <Icon
            size="24"
            cursor="pointer"
            type={icon}
            fill={active ? 'secondaryLight' : 'light'}
          />
        </Flex>
        <SubMenuContent
          active={contentVisible}
          title={title}
          header={header}
          placement={placement}
          subMenuContentSpringProps={subMenuContentSpringProps}
        >
          {children}
        </SubMenuContent>
      </StyledSubMenu>
    </Tooltip>
  );
};

export default SubMenu;
