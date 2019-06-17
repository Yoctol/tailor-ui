import React, {
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';

import { Icon } from '../Icon';
import { StatusType } from '../types';
import { useLocale } from '../locale';

import BaseModal from './BaseModal';
import Footer from './Footer';
import { FooterWrapper, ModalContent, ModalHeader } from './Modal';

export type ModalTypes = StatusType | 'confirm';

export interface ModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: MouseEventHandler;
  onCancel?: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  closable?: boolean;
}

export type Trigger = (
  options: ModalOptions,
  type: ModalTypes
) => Promise<boolean>;

interface EffectModalProps {
  triggerRef: MutableRefObject<Trigger>;
}

interface ModalOptionsState {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string | null;
  onConfirm: MouseEventHandler;
  onCancel: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  closable: boolean;
  type: ModalTypes;
}

const EffectModal: FunctionComponent<EffectModalProps> = ({ triggerRef }) => {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptionsState>({
    type: 'confirm',
    closable: true,
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {},
    onOpenComplete: () => {},
    onCloseComplete: () => {},
  });

  const getIcon = () => {
    const { type } = modalOptions;

    if (type === 'confirm') {
      return null;
    }

    return <Icon type={type} fill={type} size="32" mr="2" />;
  };

  const trigger = (options: ModalOptions, type: ModalTypes): Promise<boolean> =>
    new Promise(resolve => {
      const {
        closable = type === 'confirm',
        title = '',
        content = '',
        confirmText = locale.Modal.confirmText,
        cancelText = locale.Modal.cancelText,
        onConfirm,
        onCancel,
        onOpenComplete,
        onCloseComplete,
      } = options;

      setModalOptions({
        type,
        closable,
        title,
        content,
        confirmText,
        cancelText,
        onConfirm: event => {
          setVisible(false);

          if (onConfirm) {
            onConfirm(event);
          } else {
            resolve(true);
          }
        },
        onCancel: (event: any) => {
          setVisible(false);

          if (onCancel) {
            onCancel(event);
          } else {
            resolve(false);
          }
        },
        onOpenComplete,
        onCloseComplete,
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
    closable,
    content,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    type,
  } = modalOptions;

  return (
    <BaseModal
      closable={closable}
      statusBar={type !== 'confirm' ? type : null}
      visible={visible}
      onCancel={onCancel}
    >
      <ModalHeader
        icon={icon}
        title={title}
        closable={closable}
        onCancel={onCancel as MouseEventHandler}
      />
      <ModalContent>{content}</ModalContent>
      <FooterWrapper>
        <Footer
          closable={closable}
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel as MouseEventHandler}
          onConfirm={onConfirm}
          confirmButtonProps={{
            variant: type === 'error' ? 'danger' : 'primary',
          }}
        />
      </FooterWrapper>
    </BaseModal>
  );
};

export default EffectModal;
