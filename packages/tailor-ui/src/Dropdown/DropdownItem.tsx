import React, {
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  useContext,
} from 'react';

import DropdownContext from './DropdownContext';
import { Item } from './styles';

interface DropdownItemProps {
  /**
   * Disabled the item
   */
  disabled?: boolean;
  /**
   * Callback for click
   */
  onClick?: MouseEventHandler;
  /**
   * Keep the dropdown after click item
   */
  keep?: boolean;
}

const DropdownItem: FunctionComponent<DropdownItemProps> = ({
  keep = false,
  disabled = false,
  onClick,
  ...otherProps
}) => {
  const { close } = useContext(DropdownContext);

  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(event);
    }

    if (!keep) {
      close();
    }
  };

  return <Item onClick={handleClick} disabled={disabled} {...otherProps} />;
};

export default DropdownItem;
