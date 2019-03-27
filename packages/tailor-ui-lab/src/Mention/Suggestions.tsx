import React, { RefObject, forwardRef, useEffect } from 'react';
import { config, useTransition } from 'react-spring';

import { Portal } from 'tailor-ui';

import {
  FilteredSuggestion,
  FilteredSuggestions,
  FormatCreateText,
} from './Mention';
import { OverlayPosition } from './utils';
import { SuggestionItem, SuggestionList } from './styles';

interface SuggestionsProps {
  dropdownVisible: boolean;
  activeIndex: number;
  formatCreateText: FormatCreateText;
  overlayPosition: OverlayPosition;
  filteredSuggestions: FilteredSuggestions;
  onSuggestionClick: (suggestion: FilteredSuggestion) => void;
}

const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  function Suggestions(
    {
      dropdownVisible,
      activeIndex,
      formatCreateText,
      overlayPosition,
      filteredSuggestions,
      onSuggestionClick,
    },
    suggestionRef
  ) {
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
      const { current } = suggestionRef as RefObject<HTMLInputElement>;

      if (current) {
        const activeItemScrollTop = 9 + activeIndex * 32;

        if (
          activeItemScrollTop + 32 >=
          current.scrollTop + current.offsetHeight
        ) {
          current.scrollTop = activeItemScrollTop + 32 - current.offsetHeight;
        } else if (activeItemScrollTop <= current.scrollTop) {
          current.scrollTop = activeItemScrollTop;
        }
      }
    }, [activeIndex, suggestionRef]);

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
  }
);

export default Suggestions;
