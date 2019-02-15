import React, { PureComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { omit } from 'ramda';

import Heading from '../Heading';
import Tooltip, { ITooltipProps } from '../Tooltip';
import { Arrow, TooltipContent } from '../Tooltip/BaseTooltip';

export const ArrowComponent = styled(Arrow)`
  border-top: 5px solid ${p => p.theme.colors.gray300};
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
  border-color: ${p => p.theme.colors.gray300};
  opacity: 1;
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray700};
  text-align: left;
`;

const Header = styled.div`
  padding: ${p => p.theme.space[1]} ${p => p.theme.space[2]};
  border-bottom: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.gray300};
`;

const Content = styled.div`
  padding: ${p => p.theme.space[2]};
`;

export type PopoverProps = ITooltipProps & {
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
            {title instanceof Function ? title(hideTooltip) : title}
          </Heading.h5>
        </Header>
        <Content>
          {content instanceof Function ? content(hideTooltip) : content}
        </Content>
      </>
    );
  };

  render() {
    return (
      <Tooltip
        components={this.getComponents()}
        content={this.renderContent()}
        trigger="click"
        {...omit(['title', 'content'], this.props)}
      />
    );
  }
}

export default Popover;
