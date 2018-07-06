import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

import { getUuid } from './uuid';

let messageInstance;

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
  padding: 10px 16px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: all;
`;

const AnimatedMessageBox = animated(MessageBox);

class MesssageComponent extends Component {
  state = {
    messages: [],
  };

  remove = key => {
    this.setState(({ messages }) => ({
      messages: messages.filter(message => message.key !== key),
    }));
  };

  add = ({ content: baseContent, duration, type }) => {
    const key = getUuid();
    const timer = setTimeout(() => this.remove(key), duration);
    const content = `${type}: ${baseContent}`;

    const newMessage = {
      key,
      content,
      timer,
    };

    this.setState(({ messages }) => ({
      messages: [...messages, newMessage],
    }));
  };

  render() {
    const { messages } = this.state;
    return (
      <MessageContainer>
        <Transition
          native
          config={{
            tension: 170,
            friction: 26,
            restSpeedThreshold: 0.01,
            restDisplacementThreshold: 0.01,
          }}
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
    );
  }
}

class Message {
  constructor() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);

    render(<MesssageComponent ref={this.handleRef} />, this.el);
  }

  handleRef = messageRef => {
    this.messageRef = messageRef;
  };

  message = ({ content, duration, type }) => {
    this.messageRef.add({ content, duration, type });
  };
}

const getMessageInstance = () => {
  if (!messageInstance) {
    messageInstance = new Message();
  }
  return messageInstance;
};

const message = (content, duration = 3000, type) => {
  const instance = getMessageInstance();

  instance.message({
    content,
    duration,
    type,
  });
};

const info = (content, duration) => message(content, duration, 'info');
const success = (content, duration) => message(content, duration, 'success');
const warning = (content, duration) => message(content, duration, 'warning');
const error = (content, duration) => message(content, duration, 'error');

export { info, success, warning, error };
