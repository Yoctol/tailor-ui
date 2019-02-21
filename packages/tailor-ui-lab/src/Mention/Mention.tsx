import Editor from 'draft-js-plugins-editor';
import React, {
  Component,
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  createRef,
} from 'react';
import createMentionPlugin from 'draft-js-mention-plugin';
import styled, { css } from 'styled-components';
import { EditorState } from 'draft-js';
import { omit } from 'ramda';

import { inputStyles } from 'tailor-ui';

import SuggestionEntry from './SuggestionEntry';
import convertStringToEditorState from './convertStringToEditorState';

const StyledEntry = styled.span`
  display: inline-block;
  padding: 0 2px;
  border-radius: ${p => p.theme.radii.base};
  background-color: ${p => p.theme.colors.gray200};
  color: ${p => p.theme.colors.success};
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 0; /* reset for :focus */
    background-color: ${p => p.theme.colors.gray100};
    color: ${p => p.theme.colors.success};
  }

  &:active {
    background-color: ${p => p.theme.colors.gray300};
    color: ${p => p.theme.colors.success};
  }
`;

const Entry: FunctionComponent = props => (
  <StyledEntry {...omit(['theme'], props)} />
);

interface MentionWrapperProps {
  isFocus: boolean;
  disabled: boolean;
}

const MentionWrapper = styled.div<MentionWrapperProps>`
  ${inputStyles};

  ${p =>
    p.isFocus &&
    css`
      border-color: ${p.theme.colors.primaryDark};
    `}

  ${p =>
    p.disabled &&
    css`
      border-color: ${p.theme.colors.gray500};
      opacity: 0.5;
      background-color: ${p.theme.colors.gray300};
      cursor: not-allowed;
    `}

  /* stylelint-disable-next-line order/properties-order */
  height: auto;

  .mention-suggestions {
    display: flex;
    position: absolute;
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
    transform: scale(0);
    cursor: pointer;
  }
`;

const convertEditorStateToString = (editorState: EditorState) => {
  return editorState.getCurrentContent().getPlainText();
};

interface MentionType {
  id: string;
  name: string;
}

interface MentionProps {
  suggestions: string[];
  defaultValue?: EditorState;
  value?: EditorState;
  autoFocus?: boolean;
  disabled: boolean;
  onChange?: (editorState: EditorState) => void;
  onFocus?: MouseEventHandler;
  onBlur?: MouseEventHandler;
  creatable?: boolean;
  formatCreateText: (searchValue: string) => string;
  onCreateMention?: (name: string) => void;
}

interface MentionState {
  suggestions: MentionType[];
  editorState?: EditorState;
  isFocus: boolean;
}

class Mention extends Component<MentionProps, MentionState> {
  static defaultProps = {
    defaultValue: EditorState.createEmpty(),
    formatCreateText: (searchValue: string) =>
      `Press enter to create new mention: ${searchValue}`,
    autoFocus: false,
    disabled: false,
  };

  static convertEditorStateToString = convertEditorStateToString;

  static convertStringToEditorState = convertStringToEditorState;

  mentionPlugin = createMentionPlugin({
    entityMutability: 'IMMUTABLE',
    mentionPrefix: '@',
    mentionComponent: Entry,
    theme: {
      mention: 'mention-entry',
      mentionSuggestions: 'mention-suggestions',
    },
  });

  editorRef = createRef<any>();

  state = {
    editorState: this.props.defaultValue,
    suggestions: this.props.suggestions.map(name => ({ id: name, name })),
    isFocus: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  onChange = (editorState: EditorState) => {
    const { onChange, value } = this.props;

    if (value) {
      this.setState(() => ({
        editorState,
      }));
    }

    if (onChange) {
      onChange(editorState);
    }
  };

  onSearchChange = ({ value }: { value: string }) => {
    const { suggestions, creatable } = this.props;

    const filteredSuggestions = suggestions
      .filter(suggestion => suggestion.toLowerCase().indexOf(value) !== -1)
      .map(name => ({ id: name, name }));

    if (creatable && value !== '') {
      filteredSuggestions.push({ id: 'CREATE_NEW_MENTION', name: value });
    }

    this.setState(() => ({
      suggestions: filteredSuggestions,
    }));
  };

  onAddMention = ({ id, name }: MentionType) => {
    const { onCreateMention } = this.props;

    if (id === 'CREATE_NEW_MENTION' && onCreateMention) {
      onCreateMention(name);
    }
  };

  private onFocus = (event: MouseEvent<any>) => {
    const { onFocus } = this.props;

    this.setState(() => ({ isFocus: true }));

    if (onFocus) {
      onFocus(event);
    }
  };

  private onBlur = (event: MouseEvent<any>) => {
    const { onBlur } = this.props;

    this.setState(() => ({ isFocus: false }));

    if (onBlur) {
      onBlur(event);
    }
  };

  focus = () => {
    if (this.editorRef.current) {
      this.setState(() => ({ isFocus: true }));
      this.editorRef.current.focus();
    }
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const { value, formatCreateText, disabled, ...props } = this.props;
    const { editorState, suggestions, isFocus } = this.state;

    return (
      <MentionWrapper
        onClick={this.focus}
        isFocus={isFocus}
        disabled={disabled}
      >
        <Editor
          ref={this.editorRef}
          plugins={[this.mentionPlugin]}
          readOnly={disabled}
          editorState={value || editorState}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...props}
        />
        <MentionSuggestions
          suggestions={suggestions}
          entryComponent={(entryProps: any) => (
            <SuggestionEntry
              formatCreateText={formatCreateText}
              {...entryProps}
            />
          )}
          onSearchChange={this.onSearchChange}
          onAddMention={this.onAddMention}
        />
      </MentionWrapper>
    );
  }
}

export default Mention;
