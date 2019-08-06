import React, { FC } from 'react';
import styled from 'styled-components';
import { Moment } from 'moment';

import { Box } from '../Layout';

export interface Presets {
  [key: string]: Moment | Moment[];
}

interface DatePresetsProps {
  presets?: Presets;
  onDateClick: (date: Moment | Moment[]) => void;
}

const StyledPresetButton = styled.button`
  display: block;
  height: 24px;
  margin-bottom: 8px;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${p => p.theme.colors.gray500};
  font-size: ${p => p.theme.fontSizes.sm};
  line-height: 24px;
  cursor: pointer;
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
`;

const DatePresets: FC<DatePresetsProps> = ({ presets, onDateClick }) => {
  if (!presets || Object.keys(presets).length === 0) {
    return null;
  }

  return (
    <Box borderLeft="base" borderColor="gray200" px="8px" py="12px">
      {Object.keys(presets).map(label => (
        <StyledPresetButton
          key={label}
          onClick={() => onDateClick(presets[label])}
        >
          {label}
        </StyledPresetButton>
      ))}
    </Box>
  );
};

export default DatePresets;
