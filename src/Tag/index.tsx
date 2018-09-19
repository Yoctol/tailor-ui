import CloseIcon from 'react-icons/lib/md/close';
import React, { PureComponent, SFC } from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import { Toggle } from 'react-powerplug';

import Icon from '../Icon';

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  height: ${p => p.theme.heights.sm};
  padding: 0 ${p => p.theme.paddings.xs};
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray[7]};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;
  cursor: pointer;
  ${p => p.theme.transition};

  &:hover {
    border-color: ${p => p.theme.colors.gray[3]};
  }
`;

const ClosableIcon = styled<any>(Icon)`
  &:hover svg {
    fill: ${p => p.theme.colors.gray[3]};
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

interface AnimatedTagProps {
  onClosed: () => void;
}

const AnimatedTag: SFC<AnimatedTagProps> = ({
  children,
  onClosed,
  ...props
}) => (
  <Toggle initial>
    {({ on, toggle }) => (
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
              <ClosableIcon
                size="16"
                ml="1"
                fill="gray.7"
                cursor="pointer"
                onClick={toggle}
                type={CloseIcon}
              />
            </StyledTag>
          </AnimatedStyledTagWrapper>
        )}
      </Spring>
    )}
  </Toggle>
);

const BaseTag: SFC = ({ children, ...props }) => (
  <StyledTagWrapper>
    <StyledTag {...props}>{children}</StyledTag>
  </StyledTagWrapper>
);

export interface TagProps {
  closable: boolean;
  onClosed: () => void;
}

class Tag extends PureComponent<TagProps> {
  render() {
    const { closable, children, ...props } = this.props;
    const RenderComponent = closable ? AnimatedTag : BaseTag;

    return <RenderComponent {...props}>{children}</RenderComponent>;
  }
}

// Tag.propTypes = {
//   /**
//    * Whether the Tag can be closed
//    */
//   closable: PropTypes.bool,
//   /**
//    * Callback executed when close animation is completed
//    */
//   onClosed: PropTypes.func,
// };

// Tag.defaultProps = {
//   closable: false,
//   onClosed: () => {},
// };

export default Tag;
