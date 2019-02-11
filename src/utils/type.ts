export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function tuplify<T extends any[]>(...elements: T) {
  return elements;
}
