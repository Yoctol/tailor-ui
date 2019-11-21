import styled from 'styled-components';
import { animated } from 'react-spring';

import { Textarea as BaseTextarea } from '../Input/Textarea';
import { inputStyles } from '../Input/styles';

export const Textarea = styled(BaseTextarea)`
  position: absolute;
  top: 0;
  background-color: transparent;
  color: transparent;
  caret-color: ${p => p.theme.colors.gray700};
`;

export const MentionWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;

  .mention-highlight {
    display: inline-flex;
    color: ${p =>
      p.disabled ? p.theme.colors.gray400 : p.theme.colors.primaryLight};
    line-height: 1.3;
    text-decoration: none;

    &.invalid {
      color: ${p =>
        p.disabled ? p.theme.colors.gray400 : p.theme.colors.danger};
    }
  }
`;

export const Highlights = styled.div`
  ${inputStyles};

  /* stylelint-disable-next-line order/properties-order */
  overflow-y: auto;
  border-color: transparent;
  color: ${p => p.theme.colors.gray700};
  word-break: break-word;
  white-space: pre-wrap;
  transition: none;
`;

export const SuggestionList = styled(animated.div)`
  display: flex;
  z-index: 2;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 120px;
  max-height: 180px;
  overflow-y: auto;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.lg};
  border-color: ${p => p.theme.colors.gray300};
  background-color: ${p => p.theme.colors.light};
  box-shadow: ${p => p.theme.shadows.base};
  color: ${p => p.theme.colors.gray700};
  font-size: ${p => p.theme.fontSizes.sm};
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
`;

export const SuggestionItem = styled.div<{ active: boolean }>`
  display: flex;
  flex: none;
  align-items: center;
  height: 36px;
  padding: 0 24px;
  background-color: ${p =>
    p.active ? p.theme.colors.primaryLight : p.theme.colors.light};
  color: ${p => (p.active ? p.theme.colors.light : p.theme.colors.gray700)};
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.primaryLight};
    color: ${p => p.theme.colors.light};
  }
`;
