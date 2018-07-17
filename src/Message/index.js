import React from 'react';
import { render } from 'react-dom';

import MessageComponent, { INFO, SUCCESS, ERROR, WARNING } from './Message';

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

const info = (content, duration) => message(content, duration, INFO);
const success = (content, duration) => message(content, duration, SUCCESS);
const warning = (content, duration) => message(content, duration, WARNING);
const error = (content, duration) => message(content, duration, ERROR);

export default { info, success, warning, error };
