// https://github.com/jxnblk/styled-system/blob/master/clean-tag/index.js
import React from 'react';
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

const whitelist = ['required', 'autoFocus'];

export const omit = (obj: { [key: string]: any }, keys: string[]) => {
  const next: { [key: string]: any } = {};

  Object.keys(obj).forEach(key => {
    if (
      (!whitelist.includes(key) && typeof obj[key] === 'boolean') ||
      keys.indexOf(key) > -1
    ) {
      return;
    }

    next[key] = obj[key];
  });

  return next;
};

interface ITag {
  [key: string]: any;
}

export const Tag: ITag = React.forwardRef<{}, { is: any; blacklist: any }>(
  ({ is: TagName = 'div', blacklist = [], ...props }, ref) =>
    React.createElement(TagName, {
      ref,
      ...omit(props, blacklist),
    })
);

Tag.displayName = 'Clean.div';

Tag.defaultProps = {
  blacklist: defaultBlacklist,
};

tags.forEach((tag: string) => {
  Tag[tag] = (props: any) =>
    React.createElement(Tag as any, { is: tag, ...props });
  Tag[tag].displayName = `Clean.${tag}`;
});

export default Tag;
