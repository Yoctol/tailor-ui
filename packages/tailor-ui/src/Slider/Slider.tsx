import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clamp, minBy } from 'ramda';

import SliderDot from './SliderDot';
import { RangeValue, Value, getPageX, updateRangeValues } from './utils';
import {
  StyledSlider,
  StyledSliderActiveBar,
  StyledSliderBar,
  StyledSliderContainer,
} from './styles';

export interface SliderProps {
  value?: Value;
  defaultValue?: Value;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  disabled?: boolean;
  onChange?: (value: Value) => void;
}

const Slider: FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  range = false,
  disabled = false,
  value: valueFromProps,
  defaultValue: initialDefaultValue,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [changedValue, setChangedValue] = useState<number>();
  const [defaultValue, setDefaultValue] = useState(
    initialDefaultValue || (range ? [0, 0] : 0)
  );
  const [stepOffset, setStepOffset] = useState<number>(0);
  const [dragStart, setDragStart] = useState<{
    x: number;
    value: number;
    touch: boolean;
  } | null>(null);

  const value = (valueFromProps || defaultValue) as Value;
  const denominator = max - min;

  const handleChange = useCallback(
    (newValue: Value) => {
      if (onChange) {
        onChange(newValue);
      } else {
        setDefaultValue(newValue);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (sliderRef.current) {
      const offset = (sliderRef.current.offsetWidth / denominator) * step;
      setStepOffset(offset);
    }
  }, [denominator, step]);

  useEffect(() => {
    const handleMoveStop = () => setDragStart(null);
    const handleMoving = (event: MouseEvent | TouchEvent) => {
      if (dragStart) {
        const pageX = getPageX({
          event: event as any,
        });
        const offsetX = pageX - dragStart.x;
        const offsetValue = Math.round(offsetX / stepOffset) * step;
        const newValue = clamp(min, max, dragStart.value + offsetValue);

        const changeVal = range
          ? updateRangeValues({
              value: value as RangeValue,
              replaceValue: dragStart.value,
              newValue,
            })
          : newValue;

        if (range) {
          setChangedValue(newValue);
        }

        handleChange(changeVal);
      }
    };

    if (dragStart) {
      const moveListenerName = dragStart.touch ? 'touchmove' : 'mousemove';
      const endListenerName = dragStart.touch ? 'touchend' : 'mouseup';
      document.addEventListener(moveListenerName, handleMoving);
      document.addEventListener(endListenerName, handleMoveStop);
    }

    return () => {
      if (dragStart) {
        const moveListenerName = dragStart.touch ? 'touchmove' : 'mousemove';
        const endListenerName = dragStart.touch ? 'touchend' : 'mouseup';
        document.removeEventListener(moveListenerName, handleMoving);
        document.removeEventListener(endListenerName, handleMoveStop);

        setChangedValue(undefined);
        setActive(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragStart]);

  const valuePercentage = useMemo(
    () =>
      `${((range
        ? (value as RangeValue)[1] - (value as RangeValue)[0]
        : (value as number) - min) /
        denominator) *
        100}%`,
    [denominator, min, range, value]
  );

  const handleSlideStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (disabled) {
        return;
      }

      const isTouchEvent = 'touches' in event;

      if (isTouchEvent) {
        event.stopPropagation();
      }

      const { left } = event.currentTarget.getBoundingClientRect();
      const movedX = getPageX({ event });
      const offsetX = movedX - left;
      const offsetValue = Math.round(offsetX / stepOffset) * step + min;
      const newValue = clamp(min, max, offsetValue);

      if (range) {
        const replaceValue = minBy(
          v => Math.abs(newValue - v),
          ...(value as RangeValue)
        );

        const updatedValue = updateRangeValues({
          value: value as RangeValue,
          replaceValue,
          newValue,
        });

        setChangedValue(newValue);
        handleChange(updatedValue);
      } else {
        handleChange(newValue);
      }

      setActive(true);
      setDragStart({
        x: movedX,
        value: newValue,
        touch: isTouchEvent,
      });
    },
    [disabled, handleChange, max, min, range, step, stepOffset, value]
  );

  return (
    <StyledSliderContainer min={min} max={max}>
      <StyledSlider
        ref={sliderRef}
        disabled={disabled}
        onMouseDown={handleSlideStart}
        onTouchStart={handleSlideStart}
      >
        <StyledSliderBar />
        <StyledSliderActiveBar
          style={{
            left: range
              ? `${(((value as RangeValue)[0] - min) / denominator) * 100}%`
              : 0,
            width: valuePercentage,
          }}
        />
        <SliderDot
          range={range}
          value={value}
          active={active}
          changedValue={changedValue}
          denominator={denominator}
          min={min}
          valuePercentage={valuePercentage}
        />
      </StyledSlider>
    </StyledSliderContainer>
  );
};

export { Slider };
