export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ValuesOf<T extends any[]> = T[number];

export function tuplify<T extends any[]>(...elements: T) {
  return elements;
}
