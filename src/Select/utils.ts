import fuzzaldrin from 'fuzzaldrin-plus';
import { ReactNode } from 'react';

import { CreateOption, Option } from './SelectOptions';

export const fuzzyFilter = (itemToString: (item: Option) => string) => {
  if (itemToString) {
    return (items: Option[], input: string) => {
      const wrappedItems = items.map((item) => ({
        key: itemToString(item),
        item,
      }));

      return fuzzaldrin
        .filter(wrappedItems, input, { key: 'key' })
        .map(({ item }) => item);
    };
  }

  return (items: Option[], input: string) => fuzzaldrin.filter(items, input);
};

export const itemToString: (
  item?:
    | string
    | number
    | {
        label: ReactNode;
        value: string | number;
      }
    | CreateOption
    | undefined
) => string = (item?: Option | CreateOption) => {
  if (!item) {
    return '';
  }

  return typeof item === 'object' ? String(item.label) : String(item);
};

export const getDataTestId = (
  props: { 'data-testid'?: string },
  suffix = ''
) => {
  if (!props['data-testid']) {
    return {};
  }

  return {
    'data-testid': `${props['data-testid']}${suffix ? `-${suffix}` : ''}`,
  };
};
