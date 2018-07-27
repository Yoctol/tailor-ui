import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import { Toggle } from 'react-powerplug';
import { themeGet } from 'styled-system';

import Icon from '../Icon';

import Item, { StyledItem } from './Item';

const SubMenuWrapper = styled.div`
  overflow: hidden;

  ${StyledItem /* sc-selector */} {
    padding-left: 45px;
    background-color: ${themeGet('colors.primaryDark')};
  }
`;

const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

export default class SubMenu extends PureComponent {
  render() {
    const { initial, icon, title, children, ...otherProps } = this.props;

    return (
      <Toggle initial={initial}>
        {({ on, toggle }) => (
          <>
            <Item icon={icon} onClick={toggle} {...otherProps}>
              {title}
              <Spring
                native
                from={{ rotate: on ? 180 : 0 }}
                to={{ rotate: on ? 180 : 0 }}
              >
                {({ rotate }) => (
                  <animated.div
                    style={{
                      pointerEvents: 'none',
                      marginLeft: 'auto',
                      transform: rotate.interpolate(r => `rotate(${r}deg)`),
                    }}
                  >
                    <Icon type={ArrowUp} size="20" fill="light" />
                  </animated.div>
                )}
              </Spring>
            </Item>
            <Spring
              native
              from={{ height: on ? 'auto' : 0 }}
              to={{ height: on ? 'auto' : 0 }}
            >
              {style => (
                <AnimatedSubMenuWrapper style={style}>
                  {children}
                </AnimatedSubMenuWrapper>
              )}
            </Spring>
          </>
        )}
      </Toggle>
    );
  }
}

SubMenu.propTypes = {
  /**
   * The Item components inside this SubMenu component
   */
  children: PropTypes.node.isRequired,
  /**
   * The Icon component will display before title
   */
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * Set default open or not on SubMenu component
   */
  initial: PropTypes.bool,
  /**
   * The title
   */
  title: PropTypes.node.isRequired,
};

SubMenu.defaultProps = {
  icon: null,
  initial: false,
};
