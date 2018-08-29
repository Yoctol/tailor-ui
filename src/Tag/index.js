import CloseIcon from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import { Toggle } from 'react-powerplug';

import Icon from '../Icon';

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${p => p.theme.space.paddingYSm} ${p => p.theme.space.paddingXSm};
  border: ${p => p.theme.borders.default};
  border-radius: ${p => p.theme.radii[2]};
  border-color: ${p => p.theme.colors.gray[7]};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;
  cursor: pointer;
  ${p => p.theme.transition};

  &:hover {
    border-color: ${p => p.theme.colors.gray[3]};
  }
`;

const ClosableIcon = styled(Icon)`
  &:hover svg {
    fill: ${p => p.theme.colors.gray[3]};
  }
`;

const StyledTagWrapper = styled.div`
  display: inline-flex;

  & + & {
    margin-left: 8px;
  }
`;

const AnimatedStyledTagWrapper = animated(StyledTagWrapper);

const AnimatedTag = ({ children, onClosed, ...props }) => (
  <Toggle initial>
    {({ on, toggle }) => (
      <Spring
        native
        onRest={({ width }) => width === 0 && onClosed()}
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

const BaseTag = ({ children, ...props }) => (
  <StyledTagWrapper>
    <StyledTag {...props}>{children}</StyledTag>
  </StyledTagWrapper>
);

class Tag extends PureComponent {
  render() {
    const { closable, children, ...props } = this.props;
    const RenderComponent = closable ? AnimatedTag : BaseTag;

    return <RenderComponent {...props}>{children}</RenderComponent>;
  }
}

Tag.propTypes = {
  /**
   * Whether the Tag can be closed
   */
  closable: PropTypes.bool,
  /**
   * Callback executed when close animation is completed
   */
  onClosed: PropTypes.func,
};

Tag.defaultProps = {
  closable: false,
  onClosed: () => {},
};

export default Tag;
