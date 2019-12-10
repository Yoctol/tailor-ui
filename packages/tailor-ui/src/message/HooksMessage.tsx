import React, { MutableRefObject, PureComponent } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { State, Transition, animated } from 'react-spring/renderprops.cjs';

import { Box } from '../Layout';
import { Icon } from '../Icon';
import { Portal } from '../Portal';
import { Stack } from '../Stack';
import { StackingOrder } from '../constants';
import { StatusType } from '../types';
import { UIDContext } from '../UIProvider/UIDContext';

const MessageContainer = styled.div`
  display: flex;
  position: fixed;
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
  border-radius: ${p => p.theme.radii.lg};
  background-color: ${p => p.theme.colors.gray800};
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
  background-color: ${p => p.theme.colors.primaryLight};
`;

const AnimatedMessageBox = animated(MessageBox);

const config = { tension: 125, friction: 20, precision: 0.1 };

interface Message {
  key: string;
  icon: JSX.Element;
  content: string;
  duration: number;
  resolve: () => void;
}

export interface MessageOptions {
  content: string;
  duration: number;
}

export type Trigger = (
  options: MessageOptions,
  type: StatusType
) => Promise<boolean>;

export interface EffectMessageProps {
  triggerRef: MutableRefObject<Trigger>;
}

export interface EffectMessageState {
  messages: Message[];
}

class EffectMessage extends PureComponent<
  EffectMessageProps,
  EffectMessageState
> {
  mounted = false;

  state: EffectMessageState = {
    messages: [],
  };

  cancelMap = new WeakMap();

  componentDidMount() {
    this.props.triggerRef.current = this.add;
  }

  remove = ({ key }: any) => {
    this.setState(({ messages }) => ({
      messages: messages.filter(message => message.key !== key),
    }));
  };

  add = ({ content, duration }: MessageOptions, type: StatusType) => {
    if (!this.mounted) {
      this.mounted = true;
    }

    return new Promise<boolean>(resolve => {
      const key = this.context();
      const icon = <Icon type={type} fill={type} size="20" mr="2" />;

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
  };

  cancel = (item: Message) =>
    this.cancelMap.has(item) && this.cancelMap.get(item)();

  leave = (item: Message) => async (next: any, cancel: any) => {
    this.cancelMap.set(item, () => {
      cancel();
      item.resolve();
    });

    await next({ life: '0%' });
    await next({ opacity: 0 });
    item.resolve();
    await next({ height: 0 }, true);
  };

  config = (item: Message, state: State) =>
    state === 'leave' ? [{ duration: item.duration }, config, config] : config;

  render() {
    const { messages } = this.state;

    return (
      <Stack defaultOrder={StackingOrder.MESSAGE}>
        {stackingOrder =>
          this.mounted ? (
            <Portal zIndex={stackingOrder}>
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
                  {message => ({ life, ...props }) => (
                    <AnimatedMessageBox style={props}>
                      <MessageContent>
                        {message.icon}
                        <Box flex="auto">{message.content}</Box>
                        <Icon
                          type={MdClose}
                          fill="light"
                          size="16"
                          role="button"
                          cursor="pointer"
                          onClick={() => this.cancel(message)}
                        />
                        <Life style={{ right: life }} />
                      </MessageContent>
                    </AnimatedMessageBox>
                  )}
                </Transition>
              </MessageContainer>
            </Portal>
          ) : null
        }
      </Stack>
    );
  }
}

EffectMessage.contextType = UIDContext;

export default EffectMessage;
