import React, {
  ComponentPropsWithoutRef,
  FC,
  FocusEvent,
  KeyboardEvent,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { animated, to, useSpring } from '@react-spring/web';

import { Icon } from '../Icon';
import { useMeasure, usePrevious } from '../hooks';

import { StyledTag, StyledTagInput, StyledTagPrefix } from './styles';

const StyledTagWrapper = styled.div`
  display: inline-flex;
  overflow-x: hidden;
`;

const AnimatedStyledTagWrapper = animated(StyledTagWrapper);

const StyledCloseIcon = styled(Icon)`
  & svg {
    fill: ${(p) => p.theme.colors.primaryLight2};
  }

  &:hover svg {
    fill: ${(p) => p.theme.colors.primaryLight};
  }
`;

interface CloseIconProps {
  onClick: MouseEventHandler;
  invalid: boolean;
  disabled: boolean;
}

const CloseIcon: FC<CloseIconProps> = ({ onClick, disabled, invalid }) => {
  let fill: string | undefined;

  if (invalid) {
    fill = 'danger';
  }
  if (disabled) {
    fill = 'gray500';
  }

  return (
    <StyledCloseIcon
      size="16"
      ml="1"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      fill={fill}
      onClick={onClick}
      type={MdClose}
    />
  );
};

export interface TagProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'prefix' | 'onChange'> {
  /**
   * Whether the Tag can be closed
   */
  closable?: boolean;
  editable?: boolean;
  /**
   * Callback executed when close animation is completed
   */
  onClosed?: () => void;
  onClose?: () => void;
  canClose?: () => boolean | Promise<boolean>;
  onChange?: (previousValue: string, value: string) => void;
  children?: string;
  initialEditing?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  prefix?: ReactNode;
}

const Tag = forwardRef<HTMLDivElement, TagProps>(function Tag(
  {
    children = '',
    editable = false,
    initialEditing = false,
    closable,
    invalid = false,
    disabled = false,
    onClose,
    onClosed,
    canClose,
    prefix,
    onChange,
    onClick,
    ...otherProps
  },
  ref
) {
  const [closeDone, setCloseDone] = useState(false);
  const [on, setOn] = useState(true);
  const [editing, setEditing] = useState(initialEditing);
  const previous = usePrevious(on);
  const [bind, { width }] = useMeasure();

  const style = useSpring({
    opacity: on ? 1 : 0,
    marginRight: on ? 4 : 0,
    width: on ? width : 0,
    onRest: {
      opacity: (restOpacity) => {
        if (restOpacity.value === 0) {
          setCloseDone(true);
        }
      },
    },
  });

  useEffect(() => {
    if (onClosed && closeDone) {
      onClosed();
    }
  }, [onClosed, closeDone]);

  const handleUpdate = useCallback(
    (event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setEditing(false);

      if (onChange && children !== value) {
        onChange(children, value);
      }
    },
    [children, onChange]
  );

  if (closeDone) {
    return null;
  }

  return (
    <AnimatedStyledTagWrapper
      {...bind}
      style={{
        ...style,
        width: to(style.width, (springWidth) =>
          on && previous === on ? 'auto' : springWidth
        ),
      }}
    >
      <StyledTag
        ref={ref}
        editable={editable}
        disabled={disabled}
        invalid={invalid}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          if (editable) {
            setEditing(true);
          }
          if (onClick) {
            onClick(event);
          }
        }}
        {...otherProps}
      >
        {prefix && (
          <StyledTagPrefix invalid={invalid}>{prefix}</StyledTagPrefix>
        )}
        {editing ? (
          <StyledTagInput
            autoFocus
            defaultValue={children}
            onBlur={handleUpdate}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleUpdate(event);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setEditing(false);
              }
            }}
          />
        ) : (
          children
        )}
        {closable && (
          <CloseIcon
            invalid={invalid}
            disabled={disabled}
            onClick={async (event) => {
              if (disabled) {
                return;
              }

              event.stopPropagation();

              if (canClose && !(await canClose())) {
                return;
              }

              if (onClose) {
                onClose();
              } else {
                setOn(false);
              }
            }}
          />
        )}
      </StyledTag>
    </AnimatedStyledTagWrapper>
  );
});

export { Tag };
