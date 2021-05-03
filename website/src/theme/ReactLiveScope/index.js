/* eslint-disable import/no-extraneous-dependencies */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import debounce from 'lodash.debounce';
import * as DateFns from 'date-fns';
import * as Formik from 'formik';
import * as ReactIconsMd from 'react-icons/md';
import * as ReactIconsTi from 'react-icons/ti';
import * as Yup from 'yup';
import * as ramda from 'ramda';

import LocaleContext from '../../context/LocaleContext';
import ThemeContext from '../../context/ThemeContext';
import * as Lab from '../../../../src/lab';
import * as TailorUI from '../../../../src';
import * as TailorUIFormik from '../../../../src/formik';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...TailorUI,
  ...TailorUIFormik,
  ...Yup,
  ...Formik,
  ...ReactIconsMd,
  ...ReactIconsTi,
  ...ramda,
  Lab,
  LocaleContext,
  ThemeContext,
  DateFns,
  debounce,
};

export default ReactLiveScope;
