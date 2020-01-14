import React, { FC, Reducer, useCallback, useMemo, useReducer } from 'react';
import styled from 'styled-components';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { MdCheck, MdClose, MdFileUpload } from 'react-icons/md';

import { Box, Flex } from '../Layout';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { useLocale } from '../locale';

const FileList = styled.div`
  display: inline-flex;
  flex: none;
  flex-direction: column;
`;

const getUploadText = ({
  uploading,
  uploaded,
  failed,
  texts,
}: {
  uploading: boolean;
  uploaded: boolean;
  failed: boolean;
  texts: {
    uploadText: string;
    uploadingText: string;
    uploadedText: string;
    failedText: string;
  };
}) => {
  if (uploading) {
    return texts.uploadingText;
  }

  if (failed) {
    return texts.failedText;
  }

  if (uploaded) {
    return texts.uploadedText;
  }

  return texts.uploadText;
};

const getUploadIcon = ({
  uploaded,
  failed,
}: {
  uploaded: boolean;
  failed: boolean;
}) => {
  if (uploaded) {
    return MdCheck;
  }

  if (failed) {
    return MdClose;
  }

  return MdFileUpload;
};

interface FileItemProps {
  file: File;
  uploaded: boolean;
  onClear: (file: File) => void;
}

const StyledFileItem = styled(Flex)`
  &:hover {
    background-color: ${p => p.theme.colors.gray200};
  }
`;

const FileItem: FC<FileItemProps> = ({ file, uploaded, onClear }) => (
  <StyledFileItem alignItems="center" mt="1" p="1" borderRadius="base">
    {uploaded && (
      <Icon
        type={MdClose}
        cursor="pointer"
        mr="1"
        size="16"
        onClick={() => onClear(file)}
      />
    )}
    <Box color="gray600" fontSize="sm">
      {file.name}
    </Box>
  </StyledFileItem>
);

const START_UPLOADING = 'START_UPLOADING';
const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
const UPLOAD_FAILED = 'UPLOAD_FAILED';
const CLEAR_FILES = 'CLEAR_FILES';

interface ReducerAction {
  type: 'START_UPLOADING' | 'UPLOAD_SUCCESS' | 'UPLOAD_FAILED' | 'CLEAR_FILES';
  payload?: any;
}

interface ReducerState {
  uploading: boolean;
  uploaded: boolean;
  failed: boolean;
  files: File[];
}

const uploadReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case START_UPLOADING:
      return {
        ...state,
        uploading: true,
        uploaded: false,
        failed: false,
        files: action.payload,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        failed: false,
      };
    case UPLOAD_FAILED:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        failed: true,
      };
    case CLEAR_FILES:
      return {
        ...state,
        uploaded: false,
        files: state.files.filter(file => file.name !== action.payload),
      };
    default:
      throw new Error();
  }
};

interface UploadProps extends DropzoneOptions {
  disabled?: boolean;
  onSelect: (files: File[]) => Promise<any>;
  onClear?: (file: File) => void;
  onBeforeSelect?: () => Promise<boolean> | boolean;
  texts?: {
    uploadText?: string;
    uploadingText?: string;
    uploadedText?: string;
    failedText?: string;
  };
  buttonProps?: ButtonProps;
}

const Upload: FC<UploadProps> = ({
  onBeforeSelect,
  onSelect,
  onClear,
  disabled,
  texts = {},
  buttonProps = {},
  ...props
}) => {
  const { locale } = useLocale();
  const [state, dispatch] = useReducer(uploadReducer, {
    uploading: false,
    uploaded: false,
    failed: false,
    files: [],
  });

  const handleSelect = useCallback(
    async (selectedFiles: File[]) => {
      dispatch({
        type: 'START_UPLOADING',
        payload: selectedFiles,
      });

      try {
        await onSelect(selectedFiles);
        dispatch({ type: 'UPLOAD_SUCCESS' });
      } catch {
        dispatch({ type: 'UPLOAD_FAILED' });
      }
    },
    [onSelect]
  );

  const handleClear = useCallback(
    (clearFile: File) => {
      dispatch({ type: 'CLEAR_FILES', payload: clearFile.name });

      if (onClear) {
        onClear(clearFile);
      }
    },
    [onClear]
  );

  const icon = useMemo(() => getUploadIcon(state), [state]);
  const text = useMemo(
    () =>
      getUploadText({
        ...state,
        texts: {
          ...locale.Upload,
          ...texts,
        },
      }),
    [locale.Upload, state, texts]
  );
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleSelect,
    ...props,
  });

  return (
    <div>
      <div
        tabIndex={-1}
        onKeyPress={() => {}}
        role="button"
        {...getRootProps()}
        style={{ display: 'inline-flex', flex: 'none' }}
        onClick={event => event.preventDefault()}
      >
        <input {...getInputProps()} />
        <Button
          icon={icon}
          loading={state.uploading}
          disabled={disabled}
          onClick={async event => {
            event.preventDefault();

            if (onBeforeSelect) {
              try {
                const success = await onBeforeSelect();
                if (!success) {
                  return;
                }
              } catch (error) {
                console.error(error);

                return;
              }
            }

            open();
          }}
          {...buttonProps}
        >
          {text}
        </Button>
      </div>
      <br />
      {state.files.length > 0 && (
        <FileList>
          {state.files.map(file => (
            <FileItem
              key={file.name}
              file={file}
              uploaded={state.uploaded}
              onClear={handleClear}
            />
          ))}
        </FileList>
      )}
    </div>
  );
};

export { Upload };
