import React, {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useCallback,
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
  title?: ReactNode;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: MouseEventHandler;
  onCancel?: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  closable?: boolean;
}

export type UpdateFunction = (
  options: Omit<ModalOptions, 'onConfirm' | 'onCancel'>
) => void;

export type TriggerResponse = [Promise<boolean>, () => void, UpdateFunction] & {
  confirmation: Promise<boolean>;
  close: () => void;
  update: UpdateFunction;
};

export type Trigger = (
  options: ModalOptions,
  type: ModalTypes
) => TriggerResponse;

interface EffectModalProps {
  triggerRef: MutableRefObject<Trigger>;
}

interface ModalOptionsState {
  title?: ReactNode;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string | null;
  onConfirm: MouseEventHandler;
  onCancel: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  closable: boolean;
  type: ModalTypes;
}

const EffectModal: FC<EffectModalProps> = ({ triggerRef }) => {
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

  const getIcon = useCallback(() => {
    const { type } = modalOptions;
    const iconColor = type === 'info' ? 'primary' : type;

    if (type === 'confirm') {
      return null;
    }

    return <Icon type={type} fill={iconColor} size="32" mr="2" />;
  }, [modalOptions]);

  const trigger = useCallback(
    (options: ModalOptions, type: ModalTypes) => {
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

      let resolveFn: (value: boolean) => void = () => {};

      const confirmation = new Promise<boolean>(resolve => {
        resolveFn = resolve;
      });

      const handleConfirm = (event: any) => {
        setVisible(false);

        if (onConfirm) {
          onConfirm(event);
        } else {
          resolveFn(true);
        }
      };

      const handleCancel = (event?: any) => {
        setVisible(false);

        if (onCancel) {
          onCancel(event);
        } else {
          resolveFn(false);
        }
      };

      const handleClose = () => handleCancel();

      const handleUpdate = (
        updateOptions: Omit<ModalOptions, 'onConfirm' | 'onCancel'>
      ) => setModalOptions(prev => ({ ...prev, ...updateOptions }));

      setModalOptions({
        type,
        closable,
        title,
        content,
        confirmText,
        cancelText,
        onConfirm: handleConfirm,
        onCancel: handleCancel,
        onOpenComplete,
        onCloseComplete,
      });

      setVisible(true);

      const rtn = [confirmation, handleClose, handleUpdate];

      (rtn as TriggerResponse).confirmation = confirmation;
      (rtn as TriggerResponse).close = handleClose;
      (rtn as TriggerResponse).update = handleUpdate;

      return rtn as TriggerResponse;
    },
    [locale.Modal.cancelText, locale.Modal.confirmText]
  );

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
