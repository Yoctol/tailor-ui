import React from 'react';
import { render } from 'react-dom';

import MessageComponent from './Message';

let messageInstance;

class Message {
  constructor() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);

    render(<MessageComponent ref={this.handleRef} />, this.el);
  }

  handleRef = messageRef => {
    this.messageRef = messageRef;
  };

  message = ({ content, duration, type }) =>
    this.messageRef.add({ content, duration, type });
}

const getMessageInstance = () => {
  if (!messageInstance) {
    messageInstance = new Message();
  }
  return messageInstance;
};

const message = (content, duration = 3000, type) => {
  const instance = getMessageInstance();

  return instance.message({
    content,
    duration,
    type,
  });
};

const info = (content, duration) => message(content, duration, 'info');
const success = (content, duration) => message(content, duration, 'success');
const warning = (content, duration) => message(content, duration, 'warning');
const error = (content, duration) => message(content, duration, 'error');

export default { info, success, warning, error };
