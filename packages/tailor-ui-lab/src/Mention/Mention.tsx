import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  Reducer,
  UIEvent,
  useEffect,
  useReducer,
  useRef,
} from 'react';

import Suggestions from './Suggestions';
import { Highlights, MentionWrapper, Textarea } from './styles';
import { OverlayPosition, getMentionCursor, getOverlayPosition } from './utils';
import { applyHighlights } from './highlight';
import { getCaretCoordinates } from './textarea-caret-position';

const placement = 'bottom';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER = 13;
const ESCAPE = 27;
const TAB = 9;

type FilteredSuggestionType = 'option' | 'create';

export interface FilteredSuggestion {
  type: FilteredSuggestionType;
  value: string;
}

export type FilteredSuggestions = FilteredSuggestion[];

interface MentionReducerState {
  value: string;
  height: number;
  activeIndex: number;
  caretPos: number;
  dropdownVisible: boolean;
  filteredSuggestions: FilteredSuggestions;
  overlayPosition: OverlayPosition;
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

interface InitialState {
  value: string;
  suggestions: string[];
}

const initialState = ({ value, suggestions }: InitialState) => ({
  value,
  height: 0,
  activeIndex: -1,
  caretPos: -1,
  dropdownVisible: false,
  filteredSuggestions: suggestions.map(suggestion => ({
    type: 'option' as FilteredSuggestionType,
    value: suggestion,
  })),
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

export type FormatCreateText = (text: string) => string;

interface MentionProps {
  value?: string;
  defaultValue: string;
  suggestions: string[];
  disabled?: boolean;
  creatable: boolean;
  highlightInvalid: boolean;
  formatCreateText: FormatCreateText;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  onMentionCreate: (newMention: string) => void;
}

const Mention: FunctionComponent<MentionProps> = ({
  value: valueFromProps,
  defaultValue,
  suggestions,
  onBlur,
  onChange,
  onMentionCreate,
  disabled,
  creatable,
  highlightInvalid,
  formatCreateText,
  ...props
}) => {
  const mentionRef = useRef<any>(null);
  const highlightRef = useRef<any>(null);

  const cursorMention = useRef<CursorMention>({
    mention: null,
    searchValue: null,
    startPos: -1,
    endPos: -1,
  });

  const [state, dispatch] = useReducer(
    reducer,
    initialState({
      value: valueFromProps || defaultValue || '',
      suggestions,
    })
  );

  const value = valueFromProps || state.value;

  useEffect(() => {
    dispatch({
      type: 'updateHeight',
      payload: mentionRef.current.textarea.offsetHeight,
    });
  }, []);

  useEffect(() => {
    if (state.caretPos !== -1 && mentionRef.current.textarea) {
      mentionRef.current.textarea.focus();
      mentionRef.current.textarea.setSelectionRange(
        state.caretPos,
        state.caretPos
      );

      dispatch({ type: 'updateCaretPos', payload: -1 });
    }
  }, [state.caretPos]);

  const resetDropdown = ({ currentTarget }: ResetDropdownType) => {
    const cursor = getMentionCursor(
      currentTarget.value,
      currentTarget.selectionStart
    );

    cursorMention.current = cursor;

    if (cursor.mention !== null) {
      const filteredSuggestions = [
        ...suggestions
          .filter(suggestion => suggestion.includes(cursor.searchValue))
          .map(suggestion => ({
            type: 'option',
            value: suggestion,
          })),
        ...(creatable &&
        cursor.createValue !== '' &&
        !suggestions.includes(cursor.createValue)
          ? [{ type: 'create', value: cursor.createValue }]
          : []),
      ];

      if (filteredSuggestions.length === 0) {
        if (state.dropdownVisible) {
          dispatch({ type: 'closeDropdown' });
        }

        return;
      }

      const coordinates = getCaretCoordinates(
        currentTarget,
        cursor.startPos - 2
      );

      const mentionRect = currentTarget.getBoundingClientRect();

      const overlayPosition = getOverlayPosition({
        coordinates,
        mentionRect,
        target: currentTarget,
        placement,
      });

      dispatch({
        type: 'openDropdown',
        payload: {
          overlayPosition,
          filteredSuggestions,
        },
      });
    } else if (state.dropdownVisible) {
      dispatch({ type: 'closeDropdown' });
    }
  };

  const selectSuggestion = (suggestion: FilteredSuggestion) => {
    const { startPos, endPos } = cursorMention.current;
    const insertValue = `{{${suggestion.value}}}`;
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

    if (suggestion.type === 'create') {
      onMentionCreate(suggestion.value);
    }

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
    const { dropdownVisible, activeIndex, filteredSuggestions } = state;
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

  const handleOnBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value: newValue } = event.currentTarget;

    dispatch({ type: 'closeDropdown' });

    if (onBlur) {
      onBlur(newValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value: newValue } = event.currentTarget;

    if (newValue !== value) {
      dispatch({ type: 'updateValue', payload: newValue });

      if (onChange) {
        onChange(newValue);
      }
    }

    resetDropdown(event);
  };

  return (
    <MentionWrapper disabled={disabled}>
      <Highlights
        ref={highlightRef}
        style={{ height: state.height }}
        dangerouslySetInnerHTML={{
          __html: applyHighlights({ suggestions, value, highlightInvalid }),
        }}
      />
      <Textarea
        ref={mentionRef}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        value={value}
        onClick={resetDropdown}
        onBlur={handleOnBlur}
        onChange={handleChange}
        disabled={disabled}
        onScroll={(event: UIEvent<HTMLTextAreaElement>) => {
          if (highlightRef.current) {
            highlightRef.current.scrollTop = event.currentTarget.scrollTop;
          }
          if (state.dropdownVisible) {
            dispatch({ type: 'closeDropdown' });
          }
        }}
        onResize={(event: ChangeEvent<HTMLTextAreaElement>) => {
          // https://github.com/buildo/react-autosize-textarea/issues/109#issuecomment-430002058
          setTimeout(() =>
            dispatch({
              type: 'updateHeight',
              payload: event.target.offsetHeight,
            })
          );
        }}
        {...props}
      />
      <Suggestions
        formatCreateText={formatCreateText}
        dropdownVisible={state.dropdownVisible}
        overlayPosition={state.overlayPosition}
        filteredSuggestions={state.filteredSuggestions}
        activeIndex={state.activeIndex}
        onSuggestionClick={selectSuggestion}
      />
    </MentionWrapper>
  );
};

Mention.defaultProps = {
  defaultValue: '',
  suggestions: [],
  creatable: false,
  highlightInvalid: false,
  onMentionCreate: () => {},
  formatCreateText: createValue =>
    `Press Enter to create mention: ${createValue}`,
};

export default Mention;
