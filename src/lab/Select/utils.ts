import fuzzaldrin from 'fuzzaldrin-plus';

import {
  SelectCreateOptionObject,
  SelectOption,
  SelectOptionObject,
  SelectValue,
} from './types';

export const CREATE_OPTION = 'CREATE_OPTION';

export const isObjectOption = (
  item?: SelectValue
): item is SelectOptionObject => typeof item === 'object' && Boolean(item);

export const isCreateOption = (
  item?: SelectValue
): item is SelectCreateOptionObject =>
  isObjectOption(item) && item.label === CREATE_OPTION;

export const itemToString = (item?: SelectValue) => {
  if (isObjectOption(item)) {
    return item.label;
  }

  if (item === null || typeof item === 'undefined') {
    return '';
  }

  return String(item);
};

export const filter = <T extends SelectOption>(items: T[], input: string) => {
  const wrappedItems = items.map((item) => ({
    key: itemToString(item),
    item,
  }));

  return fuzzaldrin
    .filter(wrappedItems, input, { key: 'key' })
    .map(({ item }) => item);
};
