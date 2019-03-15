import React, { FunctionComponent, useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { DropzoneProps, useDropzone } from 'react-dropzone';
import { MdCheck, MdClose, MdFileUpload } from 'react-icons/md';

import Box from '../Grid/Box';
import Button from '../Button';
import Flex from '../Grid/Flex';
import Icon from '../Icon';
import { LocaleContext } from '../UIProvider';

const FileList = styled.div`
  display: inline-flex;
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

const FileItem: FunctionComponent<FileItemProps> = ({
  file,
  uploaded,
  onClear,
}) => (
  <Flex
    alignItems="center"
    mt="1"
    p="1"
    borderRadius="base"
    css={css`
      &:hover {
        background-color: ${p => p.theme.colors.gray200};
      }
    `}
  >
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
  </Flex>
);

interface UploadProps extends DropzoneProps {
  onSelect: (files: File[]) => Promise<any>;
  onClear?: (file: File) => void;
  onBeforeSelect?: () => Promise<boolean> | boolean;
  texts?: {
    uploadText?: string;
    uploadingText?: string;
    uploadedText?: string;
    failedText?: string;
  };
}

const Upload: FunctionComponent<UploadProps> = ({
  onBeforeSelect,
  onSelect,
  onClear,
  disabled,
  texts = {},
  ...props
}) => {
  const { locale } = useContext(LocaleContext);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSelect = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setUploading(true);
    setFailed(false);

    try {
      await onSelect(selectedFiles);
      setUploaded(true);
    } catch {
      setFailed(true);
    }

    setUploading(false);
  };

  const handleClear = (clearFile: File) => {
    setUploaded(false);
    setFiles(prevFiles =>
      prevFiles.filter(file => file.name !== clearFile.name)
    );

    if (onClear) {
      onClear(clearFile);
    }
  };

  const icon = getUploadIcon({ uploaded, failed });
  const text = getUploadText({
    uploading,
    uploaded,
    failed,
    texts: {
      ...locale.Upload,
      ...texts,
    },
  });
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleSelect,
  });

  return (
    <div>
      <div
        tabIndex={-1}
        onKeyPress={() => {}}
        role="button"
        {...getRootProps()}
        onClick={event => event.preventDefault()}
      >
        <input {...getInputProps()} />
        <Button
          icon={icon}
          loading={uploading}
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

            if (uploaded) {
              setUploaded(false);
            }

            open();
          }}
          {...props}
        >
          {text}
        </Button>
      </div>
      {files.length > 0 && (
        <FileList>
          {files.map(file => (
            <FileItem
              key={file.name}
              file={file}
              uploaded={uploaded}
              onClear={handleClear}
            />
          ))}
        </FileList>
      )}
    </div>
  );
};

export default Upload;
