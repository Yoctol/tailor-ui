import Mention, {
  Nav,
  getMentions,
  toEditorState,
  toString,
} from 'rc-editor-mention';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { inputStyles } from '../Input';

const MentionWrapper = styled.div`
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
          border-color: ${p.theme.colors.gray[3]};
        `};

      ${p =>
        p.error &&
        css`
          border-color: ${p.theme.colors.error};
        `};

      ${p =>
        p.disabled &&
        css`
          opacity: 0.5;
          cursor: not-allowed;
        `};

      div > span:not([data-offset-key]) {
        color: ${p => p.theme.colors.success};
      }
    }

    &.multilines {
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
        display: block;
        position: relative;
        padding: ${p => p.theme.space.paddingY} ${p => p.theme.space.paddingX};
        overflow: hidden;
        font-weight: normal;
        line-height: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        ${p => p.theme.transition};

        &:hover {
          background-color: ${p => p.theme.colors.gray[8]};
        }

        &.focus,
        &-active {
          background-color: ${p => p.theme.colors.gray[8]};
        }

        &-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &-selected {
          &,
          &:hover {
            background-color: ${p => p.theme.colors.gray[8]};
          }
        }

        &-divider {
          height: 1px;
          margin: 1px 0;
          overflow: hidden;
          background-color: ${p => p.theme.colors.border};
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

class MentionEditor extends React.Component {
  state = {
    suggestions: this.props.suggestions,
    focus: false,
  };

  onSearchChange = value => {
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

  onFocus = event => {
    this.setState(() => ({
      focus: true,
    }));

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  onBlur = event => {
    this.setState(() => ({
      focus: false,
    }));

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  focus = () => {
    this.mentionEle._editor.focusEditor();
  };

  mentionRef = ele => {
    this.mentionEle = ele;
  };

  mentionWrapperRef = ele => {
    this.mentionWrapperEle = ele;
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
        innerRef={this.mentionWrapperRef}
      >
        <Mention
          {...this.props}
          prefixCls="yoctol-ui-mention"
          mode="mutable"
          ref={this.mentionRef}
          getSuggestionContainer={() => this.mentionWrapperEle}
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

MentionEditor.toString = toString;
MentionEditor.toContentState = toEditorState;
MentionEditor.getMentions = getMentions;

MentionEditor.propTypes = {
  /**
   * The text
   */
  createText: PropTypes.string,
  /**
   * Tell if the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Set the mention to error status
   */
  error: PropTypes.bool,
  /**
   * placeholder of input
   */
  placeholder: PropTypes.string,
  /**
   * character which will trigger Mention to show mention list
   */
  prefix: PropTypes.string,
  /**
   * The size of the input
   */
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
  /**
   * suggestion content
   */
  suggestions: PropTypes.arrayOf(PropTypes.string),
  /**
   * textarea mode
   */
  textarea: PropTypes.bool,
  /**
   * Callback function called when mention component blur
   */
  onBlur: PropTypes.func,
  /**
   * Callback function called when content of input changes
   */
  onChange: PropTypes.func,
  /**
   * Callback function called when mention component get focus
   */
  onFocus: PropTypes.func,
  /**
   * Callback function called when select from suggestions
   */
  onSelect: PropTypes.func,
};

MentionEditor.defaultProps = {
  createText: 'Press enter to create new mention: ',
  disabled: false,
  error: false,
  suggestions: [],
  placeholder: null,
  prefix: '@',
  size: 'm',
  textarea: false,
  onSelect: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
};

export default MentionEditor;
