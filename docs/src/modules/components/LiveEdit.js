import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import styled from 'styled-components';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

const StyledEditor = styled.div`
  max-height: 600px;
  overflow: auto;
  border-top: 1px solid rgb(206, 212, 222);
  opacity: 1;
  background: lightgray;
  font-family: 'Source Code Pro', monospace;
  transition: max-height 0.2s ease, opacity 0.2s ease;

  * > textarea:focus {
    outline: none;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;

  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  border-color: rgb(206, 212, 222);
  border-image: initial;
`;

const StyledOutcome = styled.div`
  position: relative;
  padding: 3em;
`;

const StyledError = styled(LiveError)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
`;

const CodeToggle = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  border-top: rgb(206, 212, 222) solid 1px;
  border-radius: 0 0 15px 15px;
  color: gray;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const LiveEdit = ({ scope, theme, language, code }) => {
  const [displayCode, setDisplayCode] = React.useState(false);

  return (
    <LiveProvider
      code={code.trim()}
      scope={scope}
      theme={theme}
      language={language}
    >
      <StyledWrapper>
        <StyledOutcome>
          <LivePreview />
          <StyledError />
        </StyledOutcome>

        <StyledEditor
          style={displayCode ? {} : { maxHeight: '0px', opacity: 0 }}
        >
          <LiveEditor />
        </StyledEditor>

        <CodeToggle
          onClick={() => {
            setDisplayCode(!displayCode);
          }}
        >
          {displayCode ? '< >' : '</>'}
        </CodeToggle>
      </StyledWrapper>
    </LiveProvider>
  );
};
export default LiveEdit;
