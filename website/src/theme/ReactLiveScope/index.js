/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import * as DateFns from 'date-fns';
import * as Formik from 'formik';
import * as ReactIconsMd from 'react-icons/md';
import * as ReactIconsTi from 'react-icons/ti';
import * as Yup from 'yup';
import * as ramda from 'ramda';

import * as TailorUI from 'tailor-ui';
import * as TailorUIFormik from '@tailor-ui/formik';
import * as TailorUILab from '@tailor-ui/lab';

import LocaleContext from '../../context/LocaleContext';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...TailorUI,
  ...TailorUILab,
  ...TailorUIFormik,
  ...Yup,
  ...Formik,
  ...ReactIconsMd,
  ...ReactIconsTi,
  ...ramda,
  LocaleContext,
  DateFns,
};

export default ReactLiveScope;
