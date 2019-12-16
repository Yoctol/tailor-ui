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

| Property       | Description                                                                                            | Type                                          | Default |
|----------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------|---------|
| `value`        | The value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]`          | `number` \| `[number, number]`                |         |
| `defaultValue` | The default value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]`  | `number` \| `[number, number]`                |         |
| `min`          | The minimum value the slider can slide to                                                              | `number`                                      | 0       |
| `max`          | The maximum value the slider can slide to                                                              | `number`                                      | 100     |
| `step`         | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) | `number`                                      | 1       |
| `range`        | dual thumb mode                                                                                        | `boolean`                                     | false   |
| `disabled`     | If true, the slider will not be interactable.                                                          | `boolean`                                     | false   |
| `onChange`     | Callback function that is fired when the user changes the slider's value.                              | `(value: number \| [number, number]) => void` |         |
