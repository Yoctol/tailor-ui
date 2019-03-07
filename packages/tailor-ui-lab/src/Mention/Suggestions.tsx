import React, { FunctionComponent, useEffect, useRef } from 'react';
import { config, useTransition } from 'react-spring';

import { Portal } from 'tailor-ui';

import {
  FilteredSuggestion,
  FilteredSuggestions,
  FormatCreateText,
} from './Mention';
import { OverlayPosition } from './overlay-position';
import { SuggestionItem, SuggestionList } from './styles';

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
              <SuggestionList ref={suggestionRef} style={props}>
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
              </SuggestionList>
            </div>
          )
      )}
    </Portal>
  );
};

export default Suggestions;
