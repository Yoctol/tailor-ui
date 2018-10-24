import React, { PureComponent, SFC } from 'react';
import { MdClose } from 'react-icons/md';
import { Spring, animated } from 'react-spring';
import { Toggle } from 'react-powerplug';
import { omit } from 'ramda';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

import Icon from '../Icon';

const StyledTag = styled<ICssProps, 'div'>(tag.div)`
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

  ${styledCss};
`;

const ClosableIcon = styled<any, any>(Icon)`
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

interface IAnimatedTagProps {
  onClosed?: () => void;
}

const AnimatedTag: SFC<IAnimatedTagProps> = ({
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
                fill="gray400"
                cursor="pointer"
                onClick={toggle}
                type={MdClose}
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
    const RenderComponent = closable ? AnimatedTag : BaseTag;

    return <RenderComponent {...props}>{children}</RenderComponent>;
  }
}

export default Tag;
