/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Clipboard from 'clipboard';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Playground from '@theme/Playground';
import React, { useContext, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import defaultTheme from 'prism-react-renderer/themes/palenight';
import moment from 'moment';
import rangeParser from 'parse-numeric-range';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import * as Formik from 'formik';
import * as ReactIconsMd from 'react-icons/md';
import * as ReactIconsTi from 'react-icons/ti';
import * as Yup from 'yup';
import * as ramda from 'ramda';

import * as TailorUI from 'tailor-ui';
import * as TailorUIFormik from '@tailor-ui/formik';
import * as TailorUILab from '@tailor-ui/lab';

import LocaleContext from '../../context/LocaleContext';

import styles from './styles.module.css';

const highlightLinesRangeRegex = /{([\d,-]+)}/;

const scope = {
  ...React,
  ...TailorUI,
  ...TailorUILab,
  ...TailorUIFormik,
  ...Yup,
  ...Formik,
  ...ReactIconsMd,
  ...ReactIconsTi,
  ...ramda,
  useLocaleContext: () => useContext(LocaleContext),
  moment,
};

export default ({
  children,
  className: languageClassName,
  live,
  metastring,
  ...props
}) => {
  const {
    siteConfig: {
      themeConfig: { prism = {} },
    },
  } = useDocusaurusContext();
  const [showCopied, setShowCopied] = useState(false);
  const target = useRef(null);
  const button = useRef(null);
  let highlightLines = [];

  if (metastring && highlightLinesRangeRegex.test(metastring)) {
    const highlightLinesRange = metastring.match(highlightLinesRangeRegex)[1];
    highlightLines = rangeParser
      .parse(highlightLinesRange)
      .filter((n) => n > 0);
  }

  useEffect(() => {
    let clipboard;

    if (button.current) {
      clipboard = new Clipboard(button.current, {
        target: () => target.current,
      });
    }

    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, []);

  if (live) {
    return (
      <Playground
        scope={scope}
        code={children.trim()}
        theme={prism.theme || defaultTheme}
        {...props}
      />
    );
  }

  let language =
    languageClassName && languageClassName.replace(/language-/, '');

  if (!language && prism.defaultLanguage) {
    language = prism.defaultLanguage;
  }

  const handleCopyCode = () => {
    window.getSelection().empty();
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Highlight
      {...defaultProps}
      theme={prism.theme || defaultTheme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.codeBlockWrapper}>
          <pre
            ref={target}
            className={classnames(className, styles.codeBlock)}
            style={style}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });

              if (highlightLines.includes(i + 1)) {
                lineProps.className = `${lineProps.className} docusaurus-highlight-code-line`;
              }

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
          <button
            ref={button}
            type="button"
            aria-label="Copy code to clipboard"
            className={styles.copyButton}
            onClick={handleCopyCode}
          >
            {showCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </Highlight>
  );
};
