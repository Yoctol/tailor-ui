import fuzzaldrin from 'fuzzaldrin-plus';

import { Option } from './SelectOptions';

export const fuzzyFilter = (itemToString: (item: Option) => string) => {
  if (itemToString) {
    return (items: Option[], input: string) => {
      const wrappedItems = items.map(item => ({
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

export const itemToString = (item: Option | null) => {
  if (!item) {
    return '';
  }

  return typeof item === 'object' ? String(item.label) : String(item);
};
