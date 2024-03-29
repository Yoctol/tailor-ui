import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { animated, useTransition } from '@react-spring/web';
import { useIsomorphicLayoutEffect } from '@reach/utils';

import { Box } from '../Layout';
import { Icon } from '../Icon';
import { Portal } from '../Portal';
import { StackingOrder } from '../constants';
import { StatusType } from '../types';
import { useUID } from '../UIProvider/UIDContext';

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
  height: auto;
  margin-top: ${(p) => p.theme.space[2]};
  padding: ${(p) => p.theme.space[3]};
  overflow: hidden;
  border-radius: ${(p) => p.theme.radii.lg};
  background-color: ${(p) => p.theme.colors.gray800};
  color: ${(p) => p.theme.colors.light};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;

const Life = styled(animated.div)`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: auto;
  height: 3px;
  background-color: ${(p) => p.theme.colors.primaryLight};
`;

const AnimatedMessageBox = animated(MessageBox);

const config = { tension: 125, friction: 20, precision: 0.1 };

interface Message {
  key: string;
  icon: ReactNode;
  content: ReactNode;
  duration: number;
  resolve: (value: boolean) => void;
}

export interface MessageOptions {
  content: ReactNode;
  duration: number;
}

export type Trigger = (
  options: MessageOptions,
  type: StatusType
) => Promise<boolean>;

interface HooksMessageProps {
  triggerRef: MutableRefObject<Trigger>;
}

const HooksMessage: FC<HooksMessageProps> = ({ triggerRef }) => {
  const [mounted, setMounted] = useState(false);
  const refMap = useRef(new WeakMap());
  const cancelMap = useRef(new WeakMap());
  const [messages, setMessages] = useState<Message[]>([]);
  const getUid = useUID();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  const trigger = useCallback(
    ({ content, duration }: MessageOptions, type: StatusType) => {
      return new Promise<boolean>((resolve) => {
        const key = getUid();
        const icon = <Icon type={type} fill={type} size="20" mr="2" />;

        const newMessage: Message = {
          key,
          icon,
          content,
          duration,
          resolve,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    },
    [getUid]
  );

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line no-param-reassign
    triggerRef.current = trigger;
  }, [trigger, triggerRef]);

  const transition = useTransition(messages, {
    keys: (message) => message.key,
    from: {
      opacity: 0,
      height: 0,
      life: '100%',
    },
    enter: (message) => async (next, stop) => {
      cancelMap.current.set(message, () => {
        stop();
        setMessages((prevMessages) =>
          prevMessages.filter((prevMessage) => prevMessage.key !== message.key)
        );
      });

      await next({
        opacity: 1,
        height: refMap.current.get(message).offsetHeight + 8,
        config,
      });

      await next({ life: '0%', config: { duration: message.duration } });
      cancelMap.current.get(message)();
    },
    leave: (item) => async (next) => {
      await next({ opacity: 0 });
      item.resolve(true);
      await next({ height: 0 });
    },
    config,
  });

  if (!mounted) {
    return null;
  }

  return (
    <Portal defaultOrder={StackingOrder.MESSAGE}>
      <MessageContainer>
        {transition(({ life, ...style }, message) => (
          <AnimatedMessageBox style={style}>
            <MessageContent
              ref={(ref) => {
                if (ref) {
                  refMap.current.set(message, ref);
                }
              }}
            >
              {message.icon}
              <Box flex="auto">{message.content}</Box>
              <Icon
                type={MdClose}
                fill="light"
                size="16"
                role="button"
                cursor="pointer"
                onClick={() => {
                  if (cancelMap.current.has(message)) {
                    cancelMap.current.get(message)();
                  }
                }}
              />
              <Life style={{ right: life }} />
            </MessageContent>
          </AnimatedMessageBox>
        ))}
      </MessageContainer>
    </Portal>
  );
};

export default HooksMessage;
