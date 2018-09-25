import React, { PureComponent } from 'react';
import { Transition, animated } from 'react-spring';

import styled from 'utils/styled-components';

import UIProvider from '../UIProvider';
import createUuidGenerator from '../utils/createUuidGenerator';
import getTypeIcon, { Types } from '../utils/getTypeIcon';

const getUuid = createUuidGenerator('message');

const MessageContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 10000;
  top: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 10px 12px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: all;
`;

const AnimatedMessageBox = animated(MessageBox);

type Message = {
  key: string;
  content: JSX.Element;
  timer: NodeJS.Timer;
};

export type MessageOptions = {
  content: string;
  duration: number;
  type: Types;
};

export interface MessageComponentState {
  messages: Message[];
}

class MessageComponent extends PureComponent<{}, MessageComponentState> {
  state: MessageComponentState = {
    messages: [],
  };

  remove = (key: string) => {
    this.setState(({ messages }) => ({
      messages: messages.filter(message => message.key !== key),
    }));
  };

  add = ({ content: baseContent, duration, type }: MessageOptions) =>
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
      <UIProvider>
        <MessageContainer>
          <Transition
            native
            keys={messages.map(({ key }) => key)}
            from={{
              opacity: 0,
              transform: 'translateY(-30px)',
              height: 'auto',
            }}
            enter={{
              opacity: 1,
              transform: 'translateY(0)',
              height: 'auto',
            }}
            leave={{
              opacity: 0,
              transform: 'translateY(-30px)',
              height: 0,
              padding: 0,
              margin: 0,
            }}
          >
            {messages.map(({ content }) => (style: any) => (
              <AnimatedMessageBox style={style}>{content}</AnimatedMessageBox>
            ))}
          </Transition>
        </MessageContainer>
      </UIProvider>
    );
  }
}

export default MessageComponent;
