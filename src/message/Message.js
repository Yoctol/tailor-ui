import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

import ThemeProvider from '../utils/ThemeProvider';
import createUuidGenerator from '../utils/createUuidGenerator';
import getTypeIcon from '../utils/getTypeIcon';

const getUuid = createUuidGenerator('message');

const MessageContainer = styled.div`
  display: flex;
  position: fixed;
  top: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  pointer-events: none;
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

      const TypeIcon = getTypeIcon(type);
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