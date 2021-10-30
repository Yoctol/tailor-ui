import React, {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { useIsomorphicLayoutEffect } from '@reach/utils';

import { StatusType } from '../types';
import { useLocale } from '../locale';

import { Modal } from './Modal';
import { ModalSize } from './types';

export type ModalTypes = StatusType | 'confirm';

export interface ModalOptions {
  title?: ReactNode;
  content?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  onConfirm?: MouseEventHandler;
  onCancel?: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  closable?: boolean;
  zIndex?: number;
  size?: ModalSize;
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

interface HooksModalProps {
  modalTriggerRef: MutableRefObject<Trigger>;
}

interface ModalOptionsState {
  title?: ReactNode;
  content?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  onConfirm: MouseEventHandler;
  onCancel: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  closable: boolean;
  type: ModalTypes;
  zIndex?: number;
  size?: ModalSize;
}

const HooksModal: FC<HooksModalProps> = ({ modalTriggerRef }) => {
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
    size: 'md',
  });

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
        zIndex,
        size,
      } = options;

      let resolveFn: (value: boolean) => void = () => {};

      const confirmation = new Promise<boolean>((resolve) => {
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
      ) => setModalOptions((prev) => ({ ...prev, ...updateOptions }));

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
        zIndex,
        size,
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

  const {
    title,
    closable,
    content,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    type,
    zIndex,
    size,
  } = modalOptions;

  const status = type !== 'confirm' ? type : null;

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line no-param-reassign
    modalTriggerRef.current = trigger;
  }, [modalTriggerRef, trigger]);

  return (
    <Modal
      size={size}
      visible={visible}
      closable={closable}
      title={title}
      status={status}
      cancelText={cancelText}
      confirmText={confirmText}
      onCancel={onCancel as MouseEventHandler}
      onConfirm={onConfirm}
      zIndex={zIndex}
      confirmButtonProps={{
        variant: type === 'error' ? 'danger' : 'primary',
      }}
    >
      {content}
    </Modal>
  );
};

export default HooksModal;
