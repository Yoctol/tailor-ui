import React, { FunctionComponent, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { animated, config, useTransition } from 'react-spring';

import { Portal } from 'tailor-ui';

import {
  FilteredSuggestion,
  FilteredSuggestions,
  FormatCreateText,
} from './Mention';
import { OverlayPosition } from './overlay-position';

const SuggestionsList = styled(animated.div)`
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

const SuggestionItem = styled.div<{ active: boolean }>`
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

interface SuggestionsProps {
  dropdownVisible: boolean;
  activeIndex: number;
  formatCreateText: FormatCreateText;
  overlayPosition: OverlayPosition;
  filteredSuggestions: FilteredSuggestions;
  onSuggestionClick: (suggestion: FilteredSuggestion) => void;
}

const Suggestions: FunctionComponent<SuggestionsProps> = ({
  dropdownVisible,
  activeIndex,
  formatCreateText,
  overlayPosition,
  filteredSuggestions,
  onSuggestionClick,
}) => {
  const suggestionRef = useRef<HTMLDivElement>(null);
  const translations = useTransition(dropdownVisible, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: config.stiff,
  });

  useEffect(() => {
    if (suggestionRef.current) {
      const activeItemScrollTop = 9 + activeIndex * 32;

      if (
        activeItemScrollTop + 32 >=
        suggestionRef.current.scrollTop + suggestionRef.current.offsetHeight
      ) {
        suggestionRef.current.scrollTop =
          activeItemScrollTop + 32 - suggestionRef.current.offsetHeight;
      } else if (activeItemScrollTop <= suggestionRef.current.scrollTop) {
        suggestionRef.current.scrollTop = activeItemScrollTop;
      }
    }
  }, [activeIndex]);

  return (
    <Portal appendFor="mention">
      {translations.map(
        ({ key, item, props }) =>
          item && (
            <div
              key={key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                willChange: 'transform',
                transform: `translate3d(${overlayPosition.left}px, ${
                  overlayPosition.top
                }px, 0px)`,
              }}
            >
              <SuggestionsList ref={suggestionRef} style={props}>
                {filteredSuggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={suggestion.value}
                    active={index === activeIndex}
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    {suggestion.type === 'create'
                      ? formatCreateText(suggestion.value)
                      : suggestion.value}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            </div>
          )
      )}
    </Portal>
  );
};

export default Suggestions;
