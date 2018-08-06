import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import Heading from '../Heading';
import Tooltip from '../Tooltip';
import { Arrow, TooltipContent } from '../Tooltip/BaseTooltip';

export const ArrowComponent = styled(Arrow)`
  border-top: 5px solid ${themeGet('colors.gray.8')};
  opacity: 1;

  &::after {
    content: '';
    position: absolute;
    top: -7px;
    left: -6px;
    border-top: 6px solid ${themeGet('colors.light')};
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }
`;

export const ContentComponent = styled(TooltipContent)`
  padding: 0;
  border-color: ${themeGet('colors.gray.8')};
  opacity: 1;
  background-color: ${themeGet('colors.light')};
  color: ${themeGet('colors.gray.2')};
  text-align: left;
`;

const Header = styled.div`
  padding: ${themeGet('space.1')} ${themeGet('space.2')};
  border-bottom: ${themeGet('borders.default')};
  border-color: ${themeGet('colors.gray.8')};
`;

const Content = styled.div`
  padding: ${themeGet('space.2')};
`;

class Popover extends PureComponent {
  getComponents = () => ({
    ArrowComponent,
    ContentComponent,
  });

  renderContent = () => {
    const { title, content } = this.props;
    return hideTooltip => (
      <>
        <Header>
          <Heading.h5>{title}</Heading.h5>
        </Header>
        <Content>
          {typeof content === 'function' ? content(hideTooltip) : content}
        </Content>
      </>
    );
  };

  render() {
    const { title, content, ...otherProps } = this.props;
    return (
      <Tooltip
        components={this.getComponents()}
        content={this.renderContent()}
        trigger="click"
        {...otherProps}
      />
    );
  }
}

Popover.propTypes = {
  /**
   * Content of the popover
   */
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  /**
   * Title of the popover
   */
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default Popover;
