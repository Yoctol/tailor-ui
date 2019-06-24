import React from 'react';
import styled from 'styled-components';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

const StyledEditor = styled.div`
  overflow: auto;
  border-top: 1px solid rgb(206, 212, 222);
  background: lightgray;
  font-family: 'Source Code Pro', monospace;

  * > textarea:focus {
    outline: none;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;

  border-width: 1px;
  border-style: solid;
  border-color: rgb(206, 212, 222);
  border-image: initial;
`;

const StyledOutcome = styled.div`
  position: relative;
  padding: 5em;
`;

const StyledError = styled(LiveError)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin: 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
`;

const LiveEdit = ({ code, scope, theme, language }) => (
  <LiveProvider code={code} scope={scope} theme={theme} language={language}>
    <StyledWrapper>
      <StyledOutcome>
        <LivePreview />
        <StyledError />
      </StyledOutcome>

      <StyledEditor>
        <LiveEditor />
      </StyledEditor>
    </StyledWrapper>
  </LiveProvider>
);
export default LiveEdit;
