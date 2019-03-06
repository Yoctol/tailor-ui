import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Input, Textarea, inputStyles } from 'tailor-ui';

import Suggestions from './Suggestions';
import { OverlayPosition, getOverlayPosition } from './overlay-position';
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
  textarea: boolean;
  formatCreateText: FormatCreateText;
  onChange?: (value: string) => void;
  onMentionCreate: (newMention: string) => void;
}

const Mention: FunctionComponent<MentionProps> = ({
  value: valueFromProps,
  defaultValue,
  suggestions,
  onChange,
  onMentionCreate,
  disabled,
  creatable,
  textarea,
  formatCreateText,
  ...props
}) => {
  const RenderComponent = textarea ? Textarea : Input;
  const mentionRef = useRef<any>(null);
  let mentionDom: any = null;

  if (mentionRef.current) {
    mentionDom = textarea ? mentionRef.current.textarea : mentionRef.current;
  }

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
    if (mentionDom) {
      dispatch({
        type: 'updateHeight',
        payload: mentionDom.offsetHeight,
      });
    }
  }, [mentionDom]);

  useEffect(() => {
    if (state.caretPos !== -1 && mentionDom) {
      mentionDom.focus();
      mentionDom.setSelectionRange(state.caretPos, state.caretPos);

      dispatch({ type: 'updateCaretPos', payload: -1 });
    }
  }, [state.caretPos, mentionDom]);

  const resetDropdown = ({ currentTarget }: ResetDropdownType) => {
    const cursor = resetCursorMention(
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
        cursor.searchValue !== '' &&
        !suggestions.includes(cursor.searchValue)
          ? [{ type: 'create', value: cursor.searchValue }]
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

  const resizeHandler = textarea
    ? {
        onResize: (event: ChangeEvent<HTMLTextAreaElement>) =>
          // https://github.com/buildo/react-autosize-textarea/issues/109#issuecomment-430002058
          setTimeout(() =>
            dispatch({
              type: 'updateHeight',
              payload: event.target.offsetHeight,
            })
          ),
      }
    : {};

  return (
    <MentionWrapper disabled={disabled}>
      <Highlights
        style={{ height: state.height }}
        dangerouslySetInnerHTML={{ __html: applyHighlights(value) }}
      />
      <RenderComponent
        ref={mentionRef}
        style={{
          position: 'absolute',
          top: 0,
          backgroundColor: 'transparent',
        }}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onBlur={() => dispatch({ type: 'closeDropdown' })}
        value={value}
        onClick={resetDropdown}
        onChange={handleChange}
        disabled={disabled}
        {...resizeHandler}
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
  textarea: false,
  onMentionCreate: () => {},
  formatCreateText: createValue =>
    `Press Enter to create mention: ${createValue}`,
};

export default Mention;
