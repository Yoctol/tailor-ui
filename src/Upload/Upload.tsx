import Dropzone, { DropzoneProps } from 'react-dropzone';
import React, { FunctionComponent, useContext, useState } from 'react';
import { MdCheck, MdClose, MdFileUpload } from 'react-icons/md';

import styled, { css } from 'utils/styled-components';

import Box from '../Grid/Box';
import Button from '../Button';
import Flex from '../Grid/Flex';
import Icon from '../Icon';
import { LocaleContext, LocaleType } from '../UIProvider';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const FileList = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const getUploadText = ({
  uploading,
  uploaded,
  failure,
  locale,
}: {
  uploading: boolean;
  uploaded: boolean;
  failure: boolean;
  locale: LocaleType;
}) => {
  const texts = locale.Upload;

  if (uploading) {
    return texts.uploadingText;
  }

  if (failure) {
    return texts.failureText;
  }

  if (uploaded) {
    return texts.uploadedText;
  }

  return texts.uploadText;
};

const getUploadIcon = ({
  uploaded,
  failure,
}: {
  uploaded: boolean;
  failure: boolean;
}) => {
  if (uploaded) {
    return MdCheck;
  }

  if (failure) {
    return MdClose;
  }

  return MdFileUpload;
};

interface IFileItemProps {
  file: File;
  onClear: (file: File) => void;
}

const FileItem: FunctionComponent<IFileItemProps> = ({ file, onClear }) => (
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
    <Icon
      type={MdClose}
      cursor="pointer"
      mr="1"
      size="16"
      onClick={() => onClear(file)}
    />
    <Box color="gray600" fontSize="sm">
      {file.name}
    </Box>
  </Flex>
);

interface IUploadProps extends Omit<DropzoneProps, 'ref' | 'onSelect'> {
  onSelect: (files: File[]) => Promise<any>;
  onClear?: (file: File) => void;
}

const Upload: FunctionComponent<IUploadProps> = ({
  onSelect,
  onClear,
  disabled,
  ...props
}) => {
  const { locale } = useContext(LocaleContext);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [failure, setFailure] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSelect = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setUploading(true);

    try {
      await onSelect(selectedFiles);
      setUploaded(true);
    } catch {
      setFailure(true);
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

  const text = getUploadText({ uploading, uploaded, failure, locale });
  const icon = getUploadIcon({ uploaded, failure });

  return (
    <div>
      <Dropzone
        disableClick
        style={{ position: 'relative' }}
        onDrop={handleSelect}
        {...props}
      >
        {({ open }) => (
          <Button
            icon={icon}
            loading={uploading}
            disabled={disabled}
            onClick={() => {
              if (uploaded) {
                setUploaded(false);
              }
              open();
            }}
          >
            {text}
          </Button>
        )}
      </Dropzone>
      <FileList>
        {files.map(file => (
          <FileItem key={file.name} file={file} onClear={handleClear} />
        ))}
      </FileList>
    </div>
  );
};

export default Upload;
