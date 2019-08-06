import React, { forwardRef } from 'react';
import { MdDateRange } from 'react-icons/md';

import { Box, Flex } from '../Layout';
import { Icon } from '../Icon';
import { Input, InputProps } from '../Input';

import ClearIcon from './ClearIcon';

interface DatePickerInputProps {
  width: string | number;
  value: string;
  placeholder?: string;
  inputProps: InputProps;
  clearable: boolean;
  handleClear: () => void;
}

const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  function DatePickerInput(
    { width, value, inputProps, clearable, placeholder, handleClear, ...props },
    ref
  ) {
    return (
      <Flex ref={ref} position="relative" width={width} {...props}>
        <Input
          readOnly
          value={value}
          placeholder={placeholder}
          style={{ cursor: 'default' }}
          {...inputProps}
        />
        <Box
          position="absolute"
          display="inline-flex"
          alignSelf="center"
          right="8px"
        >
          {clearable && value !== '' ? (
            <ClearIcon onClick={handleClear} />
          ) : (
            <Icon
              type={MdDateRange}
              size="20"
              fill="gray300"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </Box>
      </Flex>
    );
  }
);

export default DatePickerInput;
