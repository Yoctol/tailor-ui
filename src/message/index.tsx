import React, { RefObject, createRef } from 'react';
import { render } from 'react-dom';

import { Types } from '../utils/getTypeIcon';
import MessageComponent, { MessageOptions } from './Message';

let messageInstance: Message;

class Message {
  el: Element;

  messageRef: RefObject<MessageComponent> = createRef();

  constructor() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);

    render(<MessageComponent ref={this.messageRef} />, this.el);
  }

  message = ({ content, duration, type }: MessageOptions) => {
    if (this.messageRef.current) {
      return this.messageRef.current.add({ content, duration, type });
    }

    return;
  };
}

const getMessageInstance = () => {
  if (!messageInstance) {
    messageInstance = new Message();
  }
  return messageInstance;
};

const message = (content: string, duration: number = 3000, type: Types) => {
  const instance = getMessageInstance();

  return instance.message({
    content,
    duration,
    type,
  });
};

const info = (content: string, duration?: number) =>
  message(content, duration, 'info');
const success = (content: string, duration?: number) =>
  message(content, duration, 'success');
const warning = (content: string, duration?: number) =>
  message(content, duration, 'warning');
const error = (content: string, duration?: number) =>
  message(content, duration, 'error');

export default { info, success, warning, error };
