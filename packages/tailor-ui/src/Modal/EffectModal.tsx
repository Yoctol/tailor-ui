import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import Portal from '../Portal';
import Space from '../Grid/Space';
import getTypeIcon, { Types } from '../utils/getTypeIcon';
import { LocaleType } from '../UIProvider/LocaleContext';

import BaseModal from './BaseModal';
import Footer from './Footer';

export type ModalTypes = Types | 'confirm';

export interface ModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export type Trigger = (
  options: ModalOptions,
  type: ModalTypes
) => Promise<boolean>;

interface EffectModalProps {
  locale: LocaleType;
  triggerRef: MutableRefObject<Trigger>;
}

interface ModalOptionsState {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  type: ModalTypes;
}

const EffectModal: FunctionComponent<EffectModalProps> = ({
  locale,
  triggerRef,
}) => {
  const [visible, setVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptionsState>({
    type: 'confirm',
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const getIcon = () => {
    const { type } = modalOptions;
    return getTypeIcon(type === 'confirm' ? 'warning' : type, 32);
  };

  const trigger = (options: ModalOptions, type: ModalTypes): Promise<boolean> =>
    new Promise(resolve => {
      setModalOptions({
        type,
        title: options.title || '',
        content: options.content || '',
        confirmText: options.confirmText || locale.Modal.confirmText,
        cancelText:
          type === 'confirm'
            ? options.cancelText || locale.Modal.cancelText
            : null,
        onConfirm: () => {
          if (options.onConfirm) {
            options.onConfirm();
          } else {
            resolve(true);
          }
        },
        onCancel: () => {
          if (options.onCancel) {
            options.onCancel();
          } else {
            resolve(false);
          }
        },
      });
      setVisible(true);
    });

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    triggerRef.current = trigger;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const icon = getIcon();

  const {
    title,
    content,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    type,
  } = modalOptions;

  return (
    <Portal appendFor="effect-modal">
      <BaseModal
        clickOutsite={type === 'confirm'}
        visible={visible}
        onCancel={onCancel}
      >
        <Space p="3">
          <Flex>
            {icon}
            <Box flex="auto" ml="1">
              <Heading.h3>{title}</Heading.h3>
              <Space my="3">{content}</Space>
            </Box>
          </Flex>
          <Footer
            cancelText={cancelText}
            confirmText={confirmText}
            onCancel={() => {
              onCancel();
              setVisible(false);
            }}
            onConfirm={() => {
              onConfirm();
              setVisible(false);
            }}
          />
        </Space>
      </BaseModal>
    </Portal>
  );
};

export default EffectModal;
