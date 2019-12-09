---
id: slider
title: Slider
---

A Slider component for displaying current value and intervals in range.

## When To Use

To input a value in a range.

## Examples

```js
import { Slider } from 'tailor-ui';
```

### Basic usage

```jsx live
() => {
  const [value, setValue] = useState(30);

  return (
    <>
      <Slider value={value} onChange={setValue} />
      <Slider defaultValue={40} />
    </>
  );
}
```

### Range usage

```jsx live
() => {
  const [value, setValue] = useState([30, 70]);

  return (
    <>
      <Slider range value={value} onChange={setValue} />
      <Slider range defaultValue={[40, 60]} />
    </>
  );
}
```

### Customize min & max usage

```jsx live
() => {
  const [value, setValue] = useState(130);

  return (
    <>
      <Slider min={100} max={200} value={value} onChange={setValue} />
      <Slider min={120} max={400} range defaultValue={[240, 300]} />
    </>
  );
}
```

### Customize step usage

```jsx live
() => {
  const [value, setValue] = useState(20);

  return (
    <>
      <Slider step={5} value={value} onChange={setValue} />
      <Slider step={10} range defaultValue={[30, 60]} />
    </>
  );
}
```

### Disabled

```jsx live
<>
  <Slider disabled defaultValue={30} />
  <Slider range disabled defaultValue={[40, 60]} />
</>
```

## API
