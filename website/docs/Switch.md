---
id: switch
title: Switch
---

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between Switch and Checkbox is that Switch will trigger a state change directly when you toggle it, while Checkbox is generally used for state marking, which should work in conjunction with submit operation.

## Examples

```js
import { Switch } from 'tailor-ui';
```

### With controlled

```jsx live
() => {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Switch checked onChange={console.log} />
      <br />
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
    </>
  );
};
```

### With uncontrolled

```jsx live
<Switch defaultChecked onChange={console.log} />
```

### With disabled

```jsx live
<>
  <Switch defaultChecked disabled />
  <br />
  <Switch defaultChecked={false} disabled />
</>
```

## API

| Property         | Description                                                             | Type                         | Default |
| ---------------- | ----------------------------------------------------------------------- | ---------------------------- | ------- |
| `checked`        | determine whether the Switch is checked                                 | `boolean`                    |         |
| `defaultChecked` | to set the initial state                                                | `boolean`                    |         |
| `disabled`       | Disable switch                                                          | `boolean`                    | false   |
| `onChange`       | a callback function, can be executed when the checked state is changing | `(checked: boolean) => void` |         |
