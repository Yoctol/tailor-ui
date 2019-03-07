import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { rgba } from 'polished';

import { inputStyles } from 'tailor-ui';

export const MentionWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;

  .mention-highlight {
    display: inline-flex;
    border-radius: ${p => p.theme.radii.base};
    background-color: ${p =>
      p.disabled ? p.theme.colors.gray400 : rgba(p.theme.colors.success, 0.3)};
    line-height: 1.3;
    text-decoration: none;
  }
`;

export const Highlights = styled.div`
  ${inputStyles};

  /* stylelint-disable-next-line order/properties-order */
  border-color: transparent;
  color: transparent;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const SuggestionList = styled(animated.div)`
  display: flex;
  z-index: 2;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 120px;
  max-height: 200px;
  margin-top: ${p => p.theme.space[1]};
  padding: ${p => p.theme.space[2]} 0;
  overflow-y: auto;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray300};
  outline: none;
  background-color: ${p => p.theme.colors.light};
  box-shadow: ${p => p.theme.shadows.lg};
  cursor: pointer;
`;

export const SuggestionItem = styled.div<{ active: boolean }>`
  display: inline-flex;
  flex: none;
  align-items: center;
  height: ${p => p.theme.heights.base};
  padding: 0 ${p => p.theme.paddings.sm};
  font-size: ${p => p.theme.fontSizes.base};
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);

  &:hover {
    background-color: #cce7ff;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #e6f3ff;
    `}
`;
