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
import { animated, to, useTransition } from '@react-spring/web';
import { useIsomorphicLayoutEffect } from '@reach/utils';

import { Box, Flex } from '../Layout';
import { Icon } from '../Icon';
import { Portal } from '../Portal';
import { StackingOrder } from '../constants';
import { tuplify } from '../utils';
import { useUID } from '../UIProvider/UIDContext';

const NotificationContainer = styled.div`
  display: flex;
  position: fixed;
  top: 72px;
  right: 10px;
  flex-direction: column;
`;

const NotificationBox = styled.div`
  position: relative;
  box-sizing: border-box;
  flex: none;
  width: 360px;
`;

const NotificationContent = styled.div`
  display: flex;
  position: relative;
  height: auto;
  margin-top: ${(p) => p.theme.space[2]};
  overflow: hidden;
  border-radius: ${(p) => p.theme.radii.lg};
  background-color: ${(p) => p.theme.colors.primaryLight};
  box-shadow: ${(p) => p.theme.shadows.xl};
  color: ${(p) => p.theme.colors.light};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;

const AnimatedNotificationBox = animated(NotificationBox);

const config = { tension: 125, friction: 20, precision: 0.1 };

interface Notification {
  key: string;
  icon?: ReactNode;
  content: ReactNode;
  duration: number;
}

export interface NotificationOptions {
  key?: string;
  icon?: ReactNode;
  content: ReactNode;
  duration: number;
}

export type Trigger = {
  open: (options: NotificationOptions) => [Promise<boolean>, () => void];
  close: (key: string) => void;
  destroy: () => void;
};

interface HooksNotificationProps {
  triggerRef: MutableRefObject<Trigger>;
}

const HooksNotification: FC<HooksNotificationProps> = ({ triggerRef }) => {
  const [mounted, setMounted] = useState(false);
  const promiseMap = useRef(new Map<string, (value: boolean) => void>());
  const refMap = useRef(new Map<string, HTMLDivElement>());
  const cancelMap = useRef(new Map<string, () => void>());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const getUid = useUID();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  const trigger = useCallback(
    ({ key: keyFromProps, content, icon, duration }: NotificationOptions) => {
      const key = keyFromProps ?? getUid();

      const newNotification: Notification = {
        key,
        icon,
        content,
        duration,
      };

      const promise = new Promise<boolean>((resolve) => {
        promiseMap.current.set(key, resolve);
      });

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);

      const close = () => {
        if (cancelMap.current.has(key)) {
          cancelMap.current.get(key)?.();
        }
      };

      return tuplify(promise, close);
    },
    [getUid]
  );

  const close = (key: string) => {
    cancelMap.current.get(key)?.();
    cancelMap.current.delete(key);
  };

  const destroy = () => {
    cancelMap.current.forEach((cancelCallback) => cancelCallback());
  };

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line no-param-reassign
    triggerRef.current = {
      open: trigger,
      close,
      destroy,
    };
  }, [trigger, triggerRef]);

  const transition = useTransition(notifications, {
    keys: (notification) => notification.key,
    from: {
      opacity: 0,
      height: 0,
      offset: 300,
    },
    enter: (notification) => async (next, stop) => {
      cancelMap.current.set(notification.key, () => {
        stop();
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (prevNotification) => prevNotification.key !== notification.key
          )
        );
      });

      await next({
        immediate: true,
        height: (refMap.current.get(notification.key)?.offsetHeight ?? 0) + 8,
      });

      await next({
        opacity: 1,
        offset: 0,
        config,
      });

      await next({ delay: notification.duration });
      cancelMap.current.get(notification.key)?.();
      cancelMap.current.delete(notification.key);
    },
    leave: (notification) => async (next) => {
      await next({
        opacity: 0,
        offset: 300,
        config,
      });

      promiseMap.current.get(notification.key)?.(true);
      promiseMap.current.delete(notification.key);

      await next({
        height: 0,
        config,
      });

      refMap.current.delete(notification.key);
    },
    config,
  });

  if (!mounted) {
    return null;
  }

  return (
    <Portal defaultOrder={StackingOrder.NOTIFICATION}>
      <NotificationContainer>
        {transition(({ offset, ...style }, notification) => (
          <AnimatedNotificationBox
            style={{
              ...style,
              transform: to(offset, (x) => `translateX(${x}px)`),
            }}
          >
            <NotificationContent
              ref={(ref) => {
                if (ref) {
                  refMap.current.set(notification.key, ref);
                }
              }}
            >
              {notification.icon && (
                <Flex alignItems="center" pl="3" py="0">
                  {notification.icon}
                </Flex>
              )}
              <Box flex="auto" pl="3" py="3">
                {notification.content}
              </Box>
              <Flex
                alignItems="center"
                p="3"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (cancelMap.current.has(notification.key)) {
                    cancelMap.current.get(notification.key)?.();
                  }
                }}
              >
                <Icon
                  type={MdClose}
                  fill="light"
                  size="16"
                  role="button"
                  cursor="pointer"
                />
              </Flex>
            </NotificationContent>
          </AnimatedNotificationBox>
        ))}
      </NotificationContainer>
    </Portal>
  );
};

export default HooksNotification;
