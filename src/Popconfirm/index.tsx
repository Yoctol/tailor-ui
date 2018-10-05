import React, { MouseEvent, PureComponent, ReactNode } from 'react';
import { omit } from 'ramda';

import styled from 'utils/styled-components';

import Button from '../Button';
import Flex from '../Grid/Flex';
import Space from '../Grid/Space';
import Tooltip, { ITooltipProps } from '../Tooltip';
import getTypeIcon from '../utils/getTypeIcon';
import { ArrowComponent, ContentComponent } from '../Popover';
import { LocaleConsumer } from '../UIProvider';

const components = {
  ArrowComponent,
  ContentComponent,
};

const StyledContent = styled(Space)`
  padding: ${p => p.theme.space[2]};
  word-break: break-all;
  white-space: nowrap;
`;

export type PopconfirmProps = ITooltipProps & {
  /**
   * text of the Cancel button
   */
  cancelText?: string;
  /**
   * text of the Confirm button
   */
  confirmText?: string;
  /**
   * content of the confirmation box
   */
  content: ReactNode;
  /**
   * customize icon of confirmation
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * callback of cancel
   */
  onCancel?: (event: MouseEvent) => void;
  /**
   * callback of confirmation
   */
  onConfirm?: (event: MouseEvent) => void;
};

class Popconfirm extends PureComponent<PopconfirmProps> {
  static defaultProps = {
    content: '',
    type: 'warning',
    onConfirm: () => {},
    onCancel: () => {},
  };

  renderContent = (hideTooltip: () => void) => {
    const {
      type = 'warning',
      content = '',
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
    } = this.props;

    const icon = getTypeIcon(type);

    return (
      <LocaleConsumer>
        {({ locale }) => (
          <StyledContent>
            <Flex alignItems="center">
              {icon}
              {content}
            </Flex>
            <Flex mt="3">
              <Button
                ml="auto"
                size="sm"
                onClick={(event: MouseEvent) => {
                  hideTooltip();
                  if (onCancel) {
                    onCancel(event);
                  }
                }}
              >
                {cancelText || locale.Popconfirm.cancelText}
              </Button>
              <Button
                ml="2"
                size="sm"
                type="primary"
                onClick={(event: MouseEvent) => {
                  hideTooltip();
                  if (onConfirm) {
                    onConfirm(event);
                  }
                }}
              >
                {confirmText || locale.Popconfirm.confirmText}
              </Button>
            </Flex>
          </StyledContent>
        )}
      </LocaleConsumer>
    );
  };

  render() {
    const props = omit(
      ['type', 'content', 'confirmText', 'cancelText', 'onConfirm', 'onCancel'],
      this.props
    );

    return (
      <Tooltip
        components={components}
        content={this.renderContent}
        trigger="click"
        {...props}
      />
    );
  }
}

export default Popconfirm;
