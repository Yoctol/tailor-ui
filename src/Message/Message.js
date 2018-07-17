import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';
import InfoIcon from 'react-icons/lib/md/info';
import SuccessIcon from 'react-icons/lib/md/check-circle';
import ErrorIcon from 'react-icons/lib/md/error';
import WarningIcon from 'react-icons/lib/md/warning';

import ThemeProvider from '../utils/ThemeProvider';
import Icon from '../Icon';
import createUuidGenerator from '../utils/createUuidGenerator';

const getUuid = createUuidGenerator('message');

export const INFO = '__info__';
export const SUCCESS = '__success__';
export const ERROR = '__error__';
export const WARNING = '__warning__';

const icons = {
  [INFO]: <Icon size="20" mr={2} type={InfoIcon} fill="primaryLight" />,
  [SUCCESS]: <Icon size="20" mr={2} type={SuccessIcon} fill="success" />,
  [ERROR]: <Icon size="20" mr={2} type={ErrorIcon} fill="error" />,
  [WARNING]: <Icon size="20" mr={2} type={WarningIcon} fill="warning" />,
};

const MessageContainer = styled.div`
  display: flex;
  position: fixed;
  top: 10px;
  left: 50%;
  flex-direction: column;
  align-items: center;
`;

const MessageBox = styled.div`
  margin: 8px 0;
  padding: 10px 12px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: all;
`;

const AnimatedMessageBox = animated(MessageBox);

class MessageComponent extends PureComponent {
  state = {
    messages: [],
  };

  remove = key => {
    this.setState(({ messages }) => ({
      messages: messages.filter(message => message.key !== key),
    }));
  };

  add = ({ content: baseContent, duration, type }) =>
    new Promise(resolve => {
      const key = getUuid();

      const timer = setTimeout(() => {
        this.remove(key);
        resolve();
      }, duration);

      const TypeIcon = icons[type];
      const content = (
        <>
          {TypeIcon}
          {baseContent}
        </>
      );

      const newMessage = {
        key,
        content,
        timer,
      };

      this.setState(({ messages }) => ({
        messages: [...messages, newMessage],
      }));
    });

  render() {
    const { messages } = this.state;
    return (
      <ThemeProvider>
        <MessageContainer>
          <Transition
            native
            keys={messages.map(({ key }) => key)}
            from={{ opacity: 0, transform: 'translateY(-30px)' }}
            enter={{ opacity: 1, transform: 'translateY(0)' }}
            leave={{ opacity: 0, transform: 'translateY(-30px)' }}
          >
            {messages.map(({ content }) => style => (
              <AnimatedMessageBox style={style}>{content}</AnimatedMessageBox>
            ))}
          </Transition>
        </MessageContainer>
      </ThemeProvider>
    );
  }
}

export default MessageComponent;
