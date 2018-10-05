import Mention, {
  Nav,
  getMentions,
  toEditorState,
  toString,
} from 'rc-editor-mention';
import React, {
  FocusEvent,
  FocusEventHandler,
  PureComponent,
  RefObject,
  createRef,
} from 'react';

import styled, { css } from 'utils/styled-components';

import { Size, inputStyles } from '../Input';

export interface IMentionWrapperProps {
  focus?: boolean;
  disabled?: boolean;
  error?: boolean;
  size: Size;
}

const MentionWrapper = styled<IMentionWrapperProps, 'div'>('div')`
  position: relative;

  .yoctol-ui-mention-wrapper {
    display: inline-block;
    position: relative;
    width: 100%;
    vertical-align: middle;

    .yoctol-ui-mention-editor {
      ${inputStyles};

      ${p =>
        p.focus &&
        !p.disabled &&
        css`
          border-color: ${p.theme.colors.gray700};
        `};

      ${p =>
        p.error &&
        css`
          border-color: ${p.theme.colors.error};
        `};

      ${p =>
        p.disabled &&
        css`
          border-color: ${p.theme.colors.gray500};
          opacity: 0.5;
          background-color: ${p.theme.colors.gray300};
          cursor: not-allowed;
        `};

      div > span:not([data-offset-key]) {
        color: ${p => p.theme.colors.success};
      }
    }

    &.multilines .yoctol-ui-mention-editor {
      height: auto;
    }
  }

  .yoctol-ui-mention {
    &-dropdown {
      display: flex;
      position: absolute;
      z-index: 2;
      top: -9999px;
      left: -9999px;
      flex-direction: column;
      min-width: 120px;
      max-height: 200px;
      margin-top: 1.5em;
      overflow-x: hidden;
      overflow-y: auto;
      border: 1px solid #eee;
      outline: none;
      background-color: white;
      box-shadow: 0 4px 30px 0 #dcdcdc;
      line-height: 1;
      cursor: pointer;

      &-item {
        display: flex;
        position: relative;
        flex: none;
        align-items: center;
        height: ${p => p.theme.heights.sm};
        padding: 0 ${p => p.theme.paddings.sm};
        overflow: hidden;
        font-weight: normal;
        line-height: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        ${p => p.theme.transition};

        &:hover {
          background-color: ${p => p.theme.colors.gray300};
        }

        &.focus,
        &-active {
          background-color: ${p => p.theme.colors.gray300};
        }

        &-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &-selected {
          &,
          &:hover {
            background-color: ${p => p.theme.colors.gray300};
          }
        }

        &-divider {
          height: 1px;
          margin: 1px 0;
          overflow: hidden;
          background-color: ${p => p.theme.colors.gray100};
          line-height: 0;
        }
      }
    }
  }
`;

const MentionTag = styled.span.attrs({
  contentEditable: false,
})`
  color: ${p => p.theme.colors.success};
`;

export interface IMentionEditorProps {
  autoFocus?: boolean;
  /**
   * The text
   */
  createText?: string;
  /**
   * Tell if the input is disabled.
   */
  disabled?: boolean;
  /**
   * Set the mention to error status
   */
  error?: boolean;
  /**
   * placeholder of input
   */
  placeholder?: string;
  /**
   * character which will trigger Mention to show mention list
   */
  prefix?: string;
  /**
   * The size of the input
   */
  size: 'sm' | 'md' | 'lg';
  /**
   * suggestion content
   */
  suggestions: string[];
  /**
   * textarea mode
   */
  textarea?: boolean;
  /**
   * Callback function called when mention component blur
   */
  onBlur?: FocusEventHandler<HTMLElement>;
  /**
   * Callback function called when content of input changes
   */
  onChange?: (contentState: any) => any;
  /**
   * Callback function called when mention component get focus
   */
  onFocus?: FocusEventHandler<HTMLElement>;
  /**
   * Callback function called when select from suggestions
   */
  onSelect?: (suggestion: string, data?: any) => any;
}

class MentionEditor extends PureComponent<IMentionEditorProps> {
  static toString = toString;

  static toContentState = toEditorState;

  static getMentions = getMentions;

  static defaultProps = {
    autoFocus: false,
    createText: 'Press enter to create new mention: ',
    disabled: false,
    error: false,
    suggestions: [],
    placeholder: null,
    prefix: '@',
    size: 'md',
    textarea: false,
  };

  mentionRef: RefObject<any> = createRef();

  mentionWrapperRef?: RefObject<any>;

  state = {
    suggestions: this.props.suggestions,
    focus: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  onSearchChange = (value: string) => {
    const searchValue = value.toLowerCase();
    const filtered = this.props.suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(searchValue) !== -1
    );

    const suggestions =
      filtered.length !== 0
        ? filtered
        : [
            <Nav value={value}>
              {this.props.createText}
              <MentionTag>{value}</MentionTag>
            </Nav>,
          ];

    this.setState({
      suggestions,
    });
  };

  onFocus = (event: FocusEvent<HTMLElement>) => {
    this.setState(() => ({
      focus: true,
    }));

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  onBlur = (event: FocusEvent<HTMLElement>) => {
    this.setState(() => ({
      focus: false,
    }));

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  focus = () => {
    this.mentionRef.current._editor.focusEditor();
  };

  render() {
    const { suggestions, focus } = this.state;
    const { size, error, disabled, textarea } = this.props;
    return (
      <MentionWrapper
        size={size}
        error={error}
        disabled={disabled}
        focus={focus}
        innerRef={ref => {
          this.mentionWrapperRef = ref;
        }}
      >
        <Mention
          {...this.props}
          prefixCls="yoctol-ui-mention"
          mode="mutable"
          ref={this.mentionRef}
          getSuggestionContainer={() => this.mentionWrapperRef}
          tag={MentionTag}
          prefix={this.props.prefix}
          suggestions={suggestions}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSearchChange={this.onSearchChange}
          multiLines={textarea}
        />
      </MentionWrapper>
    );
  }
}

export default MentionEditor;
