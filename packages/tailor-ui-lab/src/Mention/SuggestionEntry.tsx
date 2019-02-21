import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { omit } from 'ramda';

const SuggestionEntryWrapper = styled.div<{ isFocused: boolean }>`
  height: ${p => p.theme.heights.base};
  padding: 0 ${p => p.theme.paddings.sm};
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);

  &:active {
    background-color: #cce7ff;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: #e6f3ff;
      transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    `}

  & > span {
    display: inline-flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    font-size: ${p => p.theme.fontSizes.base};
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export interface SuggestionEntryProps {
  mention: {
    id: string;
    name: string;
  };
  isFocused: boolean;
  searchValue: string;
  formatCreateText: (searchValue: string) => string;
}

const SuggestionEntry: FunctionComponent<SuggestionEntryProps> = ({
  mention,
  searchValue,
  formatCreateText,
  ...props
}) => (
  <SuggestionEntryWrapper {...omit(['theme'], props)}>
    <span>
      {mention.id === 'CREATE_NEW_MENTION'
        ? formatCreateText(searchValue)
        : mention.name}
    </span>
  </SuggestionEntryWrapper>
);

export default SuggestionEntry;
