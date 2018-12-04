import React, { FunctionComponent, PureComponent, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Spring, animated } from 'react-spring';
import { omit } from 'ramda';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Icon from '../Icon';

const StyledTag = styled(tag.div)`
  display: inline-flex;
  align-items: center;
  height: ${p => p.theme.heights.sm};
  padding: 0 ${p => p.theme.paddings.xs};
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray400};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;
  cursor: pointer;
  ${p => p.theme.transition};

  &:hover {
    border-color: ${p => p.theme.colors.gray700};
  }
`;

const CloseIcon = styled<any, any>(Icon)`
  &:hover svg {
    fill: ${p => p.theme.colors.gray700};
  }
`;

const StyledTagWrapper = styled.div`
  display: inline-flex;
  height: ${p => p.theme.heights.sm};

  & + & {
    margin-left: 8px;
  }
`;

const AnimatedStyledTagWrapper = animated(StyledTagWrapper);

interface IClosableTagProps {
  onClosed?: () => void;
}

const ClosableTag: FunctionComponent<IClosableTagProps> = ({
  children,
  onClosed,
  ...props
}) => {
  const [on, setOn] = useState(true);

  return (
    <Spring
      native
      onRest={({ width }: any) => {
        if (width === 0 && onClosed) {
          onClosed();
        }
      }}
      from={{ transform: 'scale(1)', opacity: 1, width: 'auto' }}
      to={{
        transform: on ? 'scale(1)' : 'scale(0)',
        opacity: on ? 1 : 0,
        width: on ? 'auto' : 0,
        marginLeft: on ? undefined : 0,
      }}
    >
      {styles => (
        <AnimatedStyledTagWrapper style={styles}>
          <StyledTag {...props}>
            {children}
            <CloseIcon
              size="16"
              ml="1"
              fill="gray400"
              cursor="pointer"
              onClick={() => setOn(!on)}
              type={MdClose}
            />
          </StyledTag>
        </AnimatedStyledTagWrapper>
      )}
    </Spring>
  );
};

const BaseTag: FunctionComponent = ({ children, ...props }) => (
  <StyledTagWrapper>
    <StyledTag {...omit(['onClosed'], props)}>{children}</StyledTag>
  </StyledTagWrapper>
);

export interface ITagProps {
  /**
   * Whether the Tag can be closed
   */
  closable?: boolean;
  /**
   * Callback executed when close animation is completed
   */
  onClosed?: () => void;
}

class Tag extends PureComponent<ITagProps> {
  static defaultProps = {
    closable: false,
    onClosed: () => {},
  };

  render() {
    const { closable, children, ...props } = this.props;
    const RenderComponent = closable ? ClosableTag : BaseTag;

    return <RenderComponent {...props}>{children}</RenderComponent>;
  }
}

export default Tag;
