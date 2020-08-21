import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useContext,
} from 'react';

import { Icon, IconType } from '../Icon';

import DropdownContext from './DropdownContext';
import { Item } from './styles';

interface DropdownItemProps {
  disabled?: boolean;
  onClick?: MouseEventHandler;
  keep?: boolean;
  icon?: IconType;
}

const DropdownItem: FC<DropdownItemProps> = ({
  keep = false,
  disabled = false,
  icon,
  onClick,
  children,
  ...otherProps
}) => {
  const { close } = useContext(DropdownContext);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (disabled) {
        return;
      }

      if (onClick) {
        onClick(event);
      }

      if (!keep) {
        close();
      }
    },
    [close, disabled, keep, onClick]
  );

  return (
    <Item onClick={handleClick} disabled={disabled} {...otherProps}>
      {children}

      {icon && <Icon ml="auto" pl="8px" fill="gray300" type={icon} />}
    </Item>
  );
};

export default DropdownItem;
