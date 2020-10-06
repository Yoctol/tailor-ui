import React, {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { mergeEventProps } from '../utils';

const MirrorSpan = styled.span`
  visibility: hidden;
  position: absolute;
  pointer-events: none;
`;

const MIN_INPUT_WIDTH = 18;

const AutoSizeInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    fontSize?: number;
  }
>(function AutoSizeInput({ fontSize = 14, ...props }, ref) {
  const [value, setValue] = useState(props.value || props.defaultValue || '');
  const [width, setWidth] = useState(MIN_INPUT_WIDTH);
  const mirrorInputRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mirrorInputRef.current) {
      setWidth(mirrorInputRef.current.scrollWidth + MIN_INPUT_WIDTH);
    }
  }, [value]);

  useEffect(() => {
    if (props.value !== undefined && props.value !== value) {
      setValue(props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const inputProps = mergeEventProps(props, {
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  });

  return (
    <>
      <input
        ref={ref}
        style={{ width, boxSizing: 'content-box' }}
        {...inputProps}
      />
      <MirrorSpan ref={mirrorInputRef} style={{ fontSize }}>
        {value === '' && props.placeholder !== undefined
          ? props.placeholder
          : value}
      </MirrorSpan>
    </>
  );
});

export { AutoSizeInput };
