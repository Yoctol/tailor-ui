/* eslint-disable import/no-extraneous-dependencies */
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import moment from 'moment';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import * as Formik from 'formik';
import * as ReactIconsMd from 'react-icons/md';
import * as ReactIconsTi from 'react-icons/ti';
import * as Yup from 'yup';
import * as ramda from 'ramda';

import * as TailorUI from 'tailor-ui';
import * as TailorUIFormik from '@tailor-ui/formik';
import * as TailorUILab from '@tailor-ui/lab';

import styles from './styles.module.css';

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
  moment,
};

function Playground({
  children,
  theme,
  transformCode,
  showCode: defaultShowCode = false,
  ...props
}) {
  const [showCode, setShowCode] = useState(defaultShowCode);

  return (
    <LiveProvider
      code={children}
      transformCode={transformCode || (code => `${code};`)}
      theme={theme}
      {...props}
      scope={scope}
    >
      <div className={styles.playground}>
        <div className={styles.playgroundPreview}>
          <LivePreview />
        </div>
        {showCode && (
          <div className={styles.playgroundCode}>
            <LiveEditor />
            <LiveError />
          </div>
        )}
        <TailorUI.Button
          className={styles.playgroundButton}
          variant={showCode ? 'regular' : 'normal'}
          width="100%"
          onClick={() => setShowCode(prevShowCode => !prevShowCode)}
        >
          {showCode ? 'HIDE' : 'SHOW'} CODE
        </TailorUI.Button>
      </div>
    </LiveProvider>
  );
}

export default Playground;
