/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { MdCode, MdRefresh } from 'react-icons/md';

import { Button, Grid } from '../../../../src';

import styles from './styles.module.css';

function LiveCode({ defaultShowCode, refreshPreview, onChangeCode }) {
  const [showCode, setShowCode] = useState(defaultShowCode);

  return (
    <div className={styles.playground}>
      <div className={styles.playgroundPreview}>
        <LivePreview />
      </div>
      {showCode && (
        <div className={styles.playgroundCode}>
          <LiveEditor
            onChange={onChangeCode}
            className={styles.playgroundEditor}
          />
          <LiveError />
        </div>
      )}
      <Grid gridTemplateColumns="auto auto" gridColumnGap="8px">
        <Button
          icon={MdRefresh}
          className={styles.playgroundButton}
          width="100%"
          onClick={refreshPreview}
        >
          REFRESH
        </Button>
        <Button
          icon={MdCode}
          className={styles.playgroundButton}
          variant={showCode ? 'regular' : 'normal'}
          width="100%"
          onClick={() => setShowCode((prevShowCode) => !prevShowCode)}
        >
          {showCode ? 'HIDE' : 'SHOW'} CODE
        </Button>
      </Grid>
    </div>
  );
}

export default function Playground({
  transformCode,
  children,
  showCode: defaultShowCode = false,
  ...props
}) {
  const [, setCount] = useState(0);
  const [code, setCode] = useState(children.replace(/(\n|;)$/, ''));
  const prismTheme = usePrismTheme();

  return (
    <LiveProvider
      transformCode={transformCode || ((codeString) => codeString)}
      theme={prismTheme}
      code={code}
      {...props}
    >
      <LiveCode
        defaultShowCode={defaultShowCode}
        refreshPreview={() => setCount((prev) => prev + 1)}
        onChangeCode={(newCode) => setCode(newCode.replace(/(\n|;)$/, ''))}
      />
    </LiveProvider>
  );
}
