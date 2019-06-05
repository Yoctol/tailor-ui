import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';

import { Icon } from '../Icon';
import { LocaleType } from '../UIProvider/LocaleContext';
import { StatusType } from '../types';

import BaseModal from './BaseModal';
import Footer from './Footer';
import { FooterWrapper, ModalContent, ModalHeader } from './Modal';

export type ModalTypes = StatusType | 'confirm';

export interface ModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  cancelable?: boolean;
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
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  cancelable: boolean;
  type: ModalTypes;
}

const EffectModal: FunctionComponent<EffectModalProps> = ({
  locale,
  triggerRef,
}) => {
  const [visible, setVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptionsState>({
    type: 'confirm',
    cancelable: true,
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
        cancelable = type === 'confirm',
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
        cancelable,
        title,
        content,
        confirmText,
        cancelText,
        onConfirm: () => {
          setVisible(false);

          if (onConfirm) {
            onConfirm();
          } else {
            resolve(true);
          }
        },
        onCancel: () => {
          setVisible(false);

          if (onCancel) {
            onCancel();
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
    cancelable,
    content,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    type,
  } = modalOptions;

  return (
    <BaseModal
      cancelable={cancelable}
      statusBar={type !== 'confirm' ? type : null}
      visible={visible}
      onCancel={onCancel}
    >
      <ModalHeader
        icon={icon}
        title={title}
        closable={cancelable}
        onCancel={onCancel}
      />
      <ModalContent>{content}</ModalContent>
      <FooterWrapper>
        <Footer
          cancelable={cancelable}
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
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
