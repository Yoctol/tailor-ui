import React, { PureComponent } from 'react';
import { MdClose } from 'react-icons/md';
import { Transition, animated } from 'react-spring';

import styled from 'utils/styled-components';

import Box from '../Grid/Box';
import Icon from '../Icon';
import UIProvider from '../UIProvider';
import createUuidGenerator from '../utils/createUuidGenerator';
import getTypeIcon, { Types } from '../utils/getTypeIcon';

const getUuid = createUuidGenerator('message');

const MessageContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 10001;
  right: 10px;
  bottom: 10px;
  flex-direction: column;
`;

const MessageBox = styled.div`
  position: relative;
  box-sizing: border-box;
  flex: none;
  width: 280px;
  overflow: hidden;
`;

const MessageContent = styled.div`
  display: flex;
  position: relative;
  margin-top: ${p => p.theme.space[2]};
  padding: ${p => p.theme.space[3]};
  overflow: hidden;
  border-radius: ${p => p.theme.radii.base};
  background-color: ${p => p.theme.colors.primaryDark};
  color: ${p => p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.sm};
`;

const Life = styled(animated.div)`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: auto;
  height: 3px;
  background-color: ${p => p.theme.colors.gray400};
`;

const AnimatedMessageBox = animated(MessageBox);

const config = { tension: 125, friction: 20, precision: 0.1 };

interface IMessage {
  key: string;
  icon: JSX.Element;
  content: string;
  duration: number;
  resolve: () => void;
}

export interface IMessageOptions {
  content: string;
  duration: number;
  type: Types;
}

export interface IMessageHubState {
  messages: IMessage[];
}

class MessageHub extends PureComponent<{}, IMessageHubState> {
  state: IMessageHubState = {
    messages: [],
  };

  cancelMap = new WeakMap();

  remove = ({ key }: any) => {
    this.setState(({ messages }) => ({
      messages: messages.filter(message => message.key !== key),
    }));
  };

  add = ({ content, duration, type }: IMessageOptions) =>
    new Promise(resolve => {
      const key = getUuid();
      const icon = getTypeIcon(type);

      const newMessage = {
        key,
        icon,
        content,
        duration,
        resolve,
      };

      this.setState(({ messages }) => ({
        messages: [...messages, newMessage],
      }));
    });

  cancel = (item: any) =>
    this.cancelMap.has(item) && this.cancelMap.get(item)();

  leave = (item: any) => async (next: any, cancel: any) => {
    this.cancelMap.set(item, () => {
      cancel();
      item.resolve();
    });

    await next({ life: '0%' });
    await next({ opacity: 0 });
    item.resolve();
    await next({ height: 0 }, true);
  };

  config = (item: any, state: any) =>
    state === 'leave' ? [{ duration: item.duration }, config, config] : config;

  render() {
    const { messages } = this.state;

    return (
      <UIProvider>
        <MessageContainer>
          <Transition
            native
            keys={message => message.key}
            items={messages}
            from={{
              opacity: 0,
              height: 0,
              life: '100%',
            }}
            enter={{
              opacity: 1,
              height: 'auto',
            }}
            leave={this.leave}
            onRest={this.remove}
            config={this.config as any}
          >
            {(message: any) => ({ life, ...props }) => (
              <AnimatedMessageBox style={props}>
                <MessageContent>
                  {message.icon}
                  <Box flex="auto">{message.content}</Box>
                  <Icon
                    type={MdClose}
                    fill="light"
                    size="16"
                    cursor="pointer"
                    onClick={() => this.cancel(message)}
                  />
                </MessageContent>
                <Life style={{ right: life }} />
              </AnimatedMessageBox>
            )}
          </Transition>
        </MessageContainer>
      </UIProvider>
    );
  }
}

export default MessageHub;
