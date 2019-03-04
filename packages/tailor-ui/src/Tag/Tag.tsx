import React, { FunctionComponent, PureComponent, useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { animated, config, useSpring } from 'react-spring';
import { omit } from 'ramda';

import Icon from '../Icon';
import tag from '../utils/CleanTag';

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

const CloseIcon = styled(Icon)`
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

interface ClosableTagProps {
  onClosed?: () => void;
}

const ClosableTag: FunctionComponent<ClosableTagProps> = ({
  children,
  onClosed,
  ...props
}) => {
  const [on, setOn] = useState(true);

  const styles = useSpring({
    onRest: ({ width }: any) => {
      if (width === 0 && onClosed) {
        onClosed();
      }
    },
    immediate: on,
    opacity: on ? 1 : 0,
    width: on ? 'auto' : 0,
    marginLeft: on ? 8 : 0,
    config: config.stiff,
  });

  return (
    <AnimatedStyledTagWrapper style={styles}>
      <div style={{ display: 'inline-flex' }}>
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
      </div>
    </AnimatedStyledTagWrapper>
  );
};

const BaseTag: FunctionComponent = ({ children, ...props }) => (
  <StyledTagWrapper>
    <StyledTag {...omit(['onClosed'], props)}>{children}</StyledTag>
  </StyledTagWrapper>
);

export interface TagProps {
  /**
   * Whether the Tag can be closed
   */
  closable?: boolean;
  /**
   * Callback executed when close animation is completed
   */
  onClosed?: () => void;
}

class Tag extends PureComponent<TagProps> {
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
