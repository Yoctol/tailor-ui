import React, { RefObject, forwardRef, useEffect } from 'react';
import { config, useTransition } from '@react-spring/web';

import { Portal } from '../Portal';

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
    const translations = useTransition(dropdownVisible, {
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
        const activeItemScrollTop = activeIndex * 36;

        if (
          activeItemScrollTop + 36 >=
          current.scrollTop + current.offsetHeight
        ) {
          current.scrollTop = activeItemScrollTop + 36 - current.offsetHeight;
        } else if (activeItemScrollTop <= current.scrollTop) {
          current.scrollTop = activeItemScrollTop;
        }
      }
    }, [activeIndex, suggestionRef]);

    return (
      <>
        {translations(
          (style, item) =>
            item && (
              <Portal>
                <div
                  style={{
                    willChange: 'transform',
                    transform: `translate3d(${overlayPosition.left}px, ${overlayPosition.top}px, 0px)`,
                  }}
                >
                  <SuggestionList ref={suggestionRef} style={style}>
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
              </Portal>
            )
        )}
      </>
    );
  }
);

export default Suggestions;
