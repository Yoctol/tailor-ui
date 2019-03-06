import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { Textarea, inputStyles } from 'tailor-ui';

import Suggestions from './Suggestions';
import { getCaretCoordinates } from './textarea-caret-position';

const MentionWrapper = styled.div<{ disabled?: boolean }>`
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

const Highlights = styled.div`
  ${inputStyles};

  /* stylelint-disable-next-line order/properties-order */
  border-color: transparent;
  color: transparent;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const applyHighlights = (text: string) =>
  text
    .replace(/\n$/g, '\n\n')
    .replace(/\{{2}[^{}]+\}{2}/g, '<span class="mention-highlight">$&</span>');

const placement = 'bottom';

const PREFIX = '{{';
const SUFFIX = '}}';
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER = 13;
const ESCAPE = 27;
const TAB = 9;

const getPosition = (value: string, selectionStart: number) => {
  const startPos =
    value.lastIndexOf(PREFIX, selectionStart) > -1
      ? value.lastIndexOf(PREFIX, selectionStart) + 2
      : -1;

  const suffixPos = value.indexOf(SUFFIX, selectionStart);
  const nextPrefixPos = value.indexOf(PREFIX, selectionStart);
  const spacePos = value.indexOf(' ', selectionStart);

  const positions = [suffixPos, nextPrefixPos, spacePos]
    .filter(pos => pos !== -1)
    .sort((a, b) => a - b);

  if (
    selectionStart === startPos &&
    nextPrefixPos !== -1 &&
    nextPrefixPos === positions[0]
  ) {
    return {
      startPos,
      endPos: startPos,
    };
  }

  const endPos = positions[0] || selectionStart;

  return {
    startPos,
    endPos,
  };
};

const resetCursorMention = (originValue: string, selectionStart: number) => {
  const value = originValue.replace(/[\r\n]/g, ' ');

  const { startPos, endPos } = getPosition(value, selectionStart);
  const mention = value.substring(startPos, endPos);
  const searchValue = value.substring(startPos, selectionStart);

  console.log({
    mention,
    searchValue,
    selectionStart,
    startPos,
    endPos,
  });

  if (
    startPos < 0 ||
    endPos < 0 ||
    mention.includes('{') ||
    mention.includes('}') ||
    selectionStart < startPos ||
    selectionStart > endPos
  ) {
    return {
      mention: null,
      searchValue: null,
      startPos: -1,
      endPos: -1,
    };
  }

  return {
    mention,
    searchValue,
    startPos,
    endPos,
  };
};

interface MentionReducerState {
  value: string;
  height: number;
  activeIndex: number;
  caretPos: number;
  dropdownVisible: boolean;
  filteredSuggestions: string[];
  overlayPosition: {
    top: number;
    left: number;
  };
}

interface CursorMention {
  mention: string | null;
  searchValue: string | null;
  startPos: number;
  endPos: number;
}

interface MentionReducerAction {
  type:
    | 'closeDropdown'
    | 'openDropdown'
    | 'selectSuggestion'
    | 'setPreviousItemActive'
    | 'setNextItemActive'
    | 'setSpecfiedItemActive'
    | 'updateValue'
    | 'updateHeight'
    | 'updateCaretPos';
  payload?: any;
}

interface InitState {
  initialValue: string;
  suggestions: string[];
}

const init = ({ initialValue, suggestions }: InitState) => ({
  value: initialValue,
  height: 0,
  activeIndex: -1,
  caretPos: -1,
  dropdownVisible: false,
  filteredSuggestions: suggestions,
  overlayPosition: {
    top: 0,
    left: 0,
  },
});

const reducer: Reducer<MentionReducerState, MentionReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'closeDropdown':
      return {
        ...state,
        activeIndex: -1,
        dropdownVisible: false,
      };
    case 'openDropdown':
      return {
        ...state,
        activeIndex: 0,
        dropdownVisible: true,
        ...action.payload,
      };
    case 'selectSuggestion':
      return {
        ...state,
        dropdownVisible: false,
        activeIndex: -1,
        ...action.payload,
      };
    case 'setPreviousItemActive':
      return {
        ...state,
        activeIndex:
          state.activeIndex - 1 < 0
            ? state.filteredSuggestions.length - 1
            : state.activeIndex - 1,
      };
    case 'setNextItemActive':
      return {
        ...state,
        activeIndex:
          state.activeIndex + 1 <= state.filteredSuggestions.length - 1
            ? state.activeIndex + 1
            : 0,
      };
    case 'updateValue':
      return {
        ...state,
        value: action.payload,
      };
    case 'updateHeight':
      return {
        ...state,
        height: action.payload,
      };
    case 'updateCaretPos':
      return {
        ...state,
        caretPos: action.payload,
      };
    default:
      throw new Error();
  }
};

type ResetDropdownType =
  | KeyboardEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLTextAreaElement>;

interface MentionProps {
  value?: string;
  defaultValue: string;
  suggestions: string[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const Mention: FunctionComponent<MentionProps> = ({
  value: valueFromProps,
  defaultValue,
  suggestions,
  onChange,
  disabled,
  ...props
}) => {
  const mentionRef = useRef<{ textarea: HTMLTextAreaElement }>(null);
  const cursorMention = useRef<CursorMention>({
    mention: null,
    searchValue: null,
    startPos: -1,
    endPos: -1,
  });

  const [
    {
      value: valueFromLocal,
      dropdownVisible,
      overlayPosition,
      filteredSuggestions,
      activeIndex,
      caretPos,
      height,
    },
    dispatch,
  ] = useReducer(
    reducer,
    {
      initialValue: defaultValue || valueFromProps || '',
      suggestions,
    },
    init
  );

  const value = valueFromProps || valueFromLocal;

  useEffect(() => {
    if (caretPos !== -1 && mentionRef.current) {
      mentionRef.current.textarea.focus();
      mentionRef.current.textarea.setSelectionRange(caretPos, caretPos);

      dispatch({ type: 'updateCaretPos', payload: -1 });
    }
  }, [caretPos]);

  const resetDropdown = ({ currentTarget }: ResetDropdownType) => {
    const cursor = resetCursorMention(
      currentTarget.value,
      currentTarget.selectionStart
    );

    cursorMention.current = cursor;

    if (cursor.mention !== null) {
      const coordinates = getCaretCoordinates(
        currentTarget,
        currentTarget.selectionStart
      );
      const mentionRect = currentTarget.getBoundingClientRect();

      const top =
        mentionRect.top +
        coordinates.top -
        currentTarget.scrollTop +
        (placement === 'bottom' ? coordinates.height : 0);
      const left =
        mentionRect.left + coordinates.left - currentTarget.scrollLeft;

      dispatch({
        type: 'openDropdown',
        payload: {
          overlayPosition: {
            top,
            left,
          },
          filteredSuggestions: suggestions.filter(suggestion =>
            suggestion.includes(cursor.searchValue)
          ),
        },
      });
    } else {
      dispatch({ type: 'closeDropdown' });
    }
  };

  const selectSuggestion = (suggestion: string) => {
    const { startPos, endPos } = cursorMention.current;
    const insertValue = `{{${suggestion}}}`;
    const newValue = [
      value.slice(0, startPos - 2),
      insertValue,
      value.slice(endPos + (value[endPos] === '}' ? 2 : 0), value.length),
    ].join('');

    dispatch({
      type: 'selectSuggestion',
      payload: {
        caretPos: startPos - 2 + insertValue.length,
        value: newValue,
      },
    });

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { keyCode } = event;

    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      event.stopPropagation();
      resetDropdown(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { keyCode } = event;

    if (
      dropdownVisible &&
      keyCode === ENTER &&
      activeIndex !== -1 &&
      filteredSuggestions.length &&
      cursorMention.current
    ) {
      event.preventDefault();
      event.stopPropagation();

      selectSuggestion(filteredSuggestions[activeIndex]);

      return;
    }

    if (dropdownVisible && [TAB, ESCAPE].includes(keyCode)) {
      dispatch({ type: 'closeDropdown' });

      return;
    }

    if (dropdownVisible && keyCode === UP_ARROW) {
      event.preventDefault();
      event.stopPropagation();

      dispatch({ type: 'setPreviousItemActive' });

      return;
    }

    if (dropdownVisible && keyCode === DOWN_ARROW) {
      event.preventDefault();
      event.stopPropagation();

      dispatch({ type: 'setNextItemActive' });
    }
  };

  return (
    <MentionWrapper disabled={disabled}>
      <Highlights
        style={{ height }}
        dangerouslySetInnerHTML={{ __html: applyHighlights(value) }}
      />
      <Textarea
        ref={mentionRef}
        css={css`
          position: absolute;
          top: 0;
          background-color: transparent;
        `}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onResize={(event: ChangeEvent<HTMLTextAreaElement>) => {
          // https://github.com/buildo/react-autosize-textarea/issues/109#issuecomment-430002058
          setTimeout(() =>
            dispatch({
              type: 'updateHeight',
              payload: event.target.offsetHeight,
            })
          );
        }}
        onBlur={() => {
          dispatch({ type: 'closeDropdown' });
        }}
        value={value}
        onClick={resetDropdown}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          const { value: newValue } = event.currentTarget;

          if (newValue !== value) {
            dispatch({ type: 'updateValue', payload: newValue });

            if (onChange) {
              onChange(newValue);
            }
          }

          resetDropdown(event);
        }}
        disabled={disabled}
        {...props}
      />
      <Suggestions
        dropdownVisible={dropdownVisible}
        overlayPosition={overlayPosition}
        filteredSuggestions={filteredSuggestions}
        activeIndex={activeIndex}
        onSuggestionClick={selectSuggestion}
      />
    </MentionWrapper>
  );
};

Mention.defaultProps = {
  defaultValue: '',
  suggestions: [],
};

export default Mention;
