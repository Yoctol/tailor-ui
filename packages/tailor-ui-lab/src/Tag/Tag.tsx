import React, {
  FocusEvent,
  FunctionComponent,
  KeyboardEvent,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { animated, useSpring } from 'react-spring';

import { Icon, useMeasure, usePrevious } from 'tailor-ui';

import { StyledTag, StyledTagInput, StyledTagPrefix } from './styles';

const StyledTagWrapper = styled.div`
  display: inline-flex;
  overflow-x: hidden;
`;

const AnimatedStyledTagWrapper = animated(StyledTagWrapper);

const StyledCloseIcon = styled(Icon)`
  & svg {
    fill: ${p => p.theme.colors.primaryLight2};
  }

  &:hover svg {
    fill: ${p => p.theme.colors.primaryLight};
  }
`;

const CloseIcon: FunctionComponent<{
  onClick: MouseEventHandler;
  invalid: boolean;
}> = ({ onClick, invalid }) => (
  <StyledCloseIcon
    size="16"
    ml="1"
    cursor="pointer"
    fill={invalid ? 'danger' : undefined}
    onClick={onClick}
    type={MdClose}
  />
);

export interface TagProps {
  /**
   * Whether the Tag can be closed
   */
  closable?: boolean;
  editable?: boolean;
  /**
   * Callback executed when close animation is completed
   */
  onClosed?: () => void;
  canClose?: () => boolean;
  onChange?: (previousValue: string, value: string) => void;
  children?: string;
  initialEditing?: boolean;
  invalid?: boolean;
  prefix?: ReactNode;
}

const Tag: FunctionComponent<TagProps> = ({
  children = '',
  editable = false,
  initialEditing = false,
  closable,
  invalid = false,
  onClosed,
  canClose,
  prefix,
  onChange,
  ...otherProps
}) => {
  const [on, setOn] = useState(true);
  const [editing, setEditing] = useState(initialEditing);
  const previous = usePrevious(on);
  const [bind, { width }] = useMeasure();

  const props = useSpring({
    opacity: on ? 1 : 0,
    marginRight: on ? 4 : 0,
    width: on ? width : 0,
    onRest: ({ width: restWidth }: { width: number }) => {
      if (!on && restWidth === 0 && onClosed) {
        onClosed();
      }
    },
  });

  const handleUpdate = (
    event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    const { value } = event.currentTarget;

    setEditing(false);

    if (onChange && children !== value) {
      onChange(children, value);
    }
  };

  return (
    <AnimatedStyledTagWrapper
      style={{ ...props, width: on && previous === on ? 'auto' : props.width }}
      {...bind}
    >
      <StyledTag
        editable={editable}
        invalid={invalid}
        onClick={() => {
          if (editable) {
            setEditing(true);
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
            invalid={invalid}
            defaultValue={children}
            onBlur={handleUpdate}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleUpdate(event);
              }
            }}
            onKeyDown={event => {
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
            onClick={async event => {
              event.stopPropagation();

              if (canClose && (await !canClose())) {
                return;
              }

              setOn(!on);
            }}
          />
        )}
      </StyledTag>
    </AnimatedStyledTagWrapper>
  );
};

export default Tag;
