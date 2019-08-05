import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  useCallback,
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

const DropdownItem: FC<DropdownItemProps> = ({
  keep = false,
  disabled = false,
  onClick,
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

  return <Item onClick={handleClick} disabled={disabled} {...otherProps} />;
};

export default DropdownItem;
