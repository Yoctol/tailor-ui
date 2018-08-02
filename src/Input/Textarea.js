import PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { StyledInput } from '.';

const StyledTextarea = styled(StyledInput.withComponent(TextareaAutosize))`
  word-wrap: break-word;
  transition: border 0.2s ease;
  resize: ${ifProp('resize', 'initial', 'none')};
`;

const Textarea = props => <StyledTextarea size="m" {...props} />;

Textarea.propTypes = {
  /**
   * Specific the max rows of textarea
   */
  maxRows: PropTypes.number,
  /**
   * Specific the min rows of textarea
   */
  minRows: PropTypes.number,
  /**
   * The callback function that is triggered when height changed
   */
  onHeightChange: PropTypes.func,
};

Textarea.defaultProps = {
  onHeightChange: () => {},
  maxRows: null,
  minRows: null,
};

export default Textarea;
