// https://github.com/jxnblk/styled-system/blob/master/clean-tag/index.js
import React, { forwardRef } from 'react';
import htmlElementAttributes from 'react-html-attributes';
import tags from 'html-tags';
import * as styles from 'styled-system';

const allPropTypes = Object.keys(styles)
  .filter(key => typeof (styles as any)[key] === 'function')
  .reduce((props, key) => {
    // eslint-disable-next-line
    props = { ...props, ...(styles as any)[key].propTypes };
    return props;
  }, {});

const defaultBlacklist = [
  ...Object.keys(allPropTypes),
  'theme',
  'overflowY',
  'overflowX',
  'tailColor',
];

const omit = (obj: { [key: string]: any }, tagName: string, keys: string[]) => {
  const next: { [key: string]: any } = {};

  Object.keys(obj).forEach(key => {
    const acceptAttrs = [
      ...htmlElementAttributes['*'],
      ...(htmlElementAttributes[tagName] || []),
    ];

    if (
      acceptAttrs.includes(key) ||
      (keys.indexOf(key) === -1 && typeof obj[key] !== 'boolean')
    ) {
      next[key] = obj[key];
    }
  });

  return next;
};

const Tags: { [key: string]: any } = {};

tags.forEach((Tag: string) => {
  Tags[Tag] = forwardRef<any, { is: any; blacklist: string[] }>(
    ({ blacklist = [], ...props }, ref) =>
      React.createElement(Tag, {
        ref,
        ...omit(props, Tag, [...blacklist, ...defaultBlacklist]),
      })
  );

  Tags[Tag].displayName = `Clean.${Tag}`;
});

export default Tags;
