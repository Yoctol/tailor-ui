import React, { PureComponent, ReactNode } from 'react';

import styled from 'utils/styled-components';

import Heading from '../Heading';
import Tooltip, { TooltipProps } from '../Tooltip';
import { Arrow, TooltipContent } from '../Tooltip/BaseTooltip';

export const ArrowComponent = styled(Arrow)`
  border-top: 5px solid ${p => p.theme.colors.gray[8]};
  opacity: 1;

  &::after {
    content: '';
    position: absolute;
    top: -7px;
    left: -6px;
    border-top: 6px solid ${p => p.theme.colors.light};
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }
`;

export const ContentComponent = styled(TooltipContent)`
  padding: 0;
  border-color: ${p => p.theme.colors.gray[8]};
  opacity: 1;
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray[2]};
  text-align: left;
`;

const Header = styled.div`
  padding: ${p => p.theme.space[1]} ${p => p.theme.space[2]};
  border-bottom: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.gray[8]};
`;

const Content = styled.div`
  padding: ${p => p.theme.space[2]};
`;

export type PopoverProps = TooltipProps & {
  /**
   * Title of the popover
   */
  title: ReactNode | ((hideTooltip: () => void) => ReactNode);
};

class Popover extends PureComponent<PopoverProps> {
  getComponents = () => ({
    ArrowComponent,
    ContentComponent,
  });

  renderContent = () => {
    const { title, content } = this.props;
    return (hideTooltip: () => void) => (
      <>
        <Header>
          <Heading.h5>
            {typeof title === 'function' ? title(hideTooltip) : title}
          </Heading.h5>
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

export default Popover;
