import React from 'react';
import { clamp } from 'ramda';

export type RangeValue = [number, number];
export type Value = RangeValue | number;

export const getOffsetValue = ({
  event,
  startX,
  stepOffset,
  min,
  max,
}: {
  event: React.MouseEvent | React.TouchEvent;
  startX: number;
  stepOffset: number;
  min: number;
  max: number;
}) => {
  const { pageX: currentX } = 'touches' in event ? event.touches[0] : event;
  const offsetX = currentX - startX;
  const offsetValue = Math.round(offsetX / stepOffset);
  const value = clamp(min, max, offsetValue);

  return value;
};

export const getPageX = ({
  event,
}: {
  event: React.TouchEvent | React.MouseEvent;
}) => {
  return 'touches' in event ? event.touches[0].pageX : event.pageX;
};

export const getMovedValue = ({
  offsetX,
  stepOffset,
  min,
  max,
}: {
  offsetX: number;
  stepOffset: number;
  min: number;
  max: number;
}) => {
  const offsetValue = Math.round(offsetX / stepOffset);
  const value = clamp(min, max, offsetValue);

  return value;
};

export const updateRangeValues = ({
  value,
  replaceValue,
  newValue,
}: {
  value: RangeValue;
  replaceValue: number;
  newValue: number;
}): RangeValue => {
  if (value.every(val => val === replaceValue)) {
    return [value[0], newValue];
  }

  const updatedValues = value
    .map(v => (v === replaceValue ? newValue : v))
    .sort((a, b) => a - b) as RangeValue;

  return updatedValues;
};
