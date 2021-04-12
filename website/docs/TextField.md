---
id: textfield
title: TextField
---

Text fields let users enter and edit text.

## When to use

When a maxLength and label needs to be provided.

## Examples

```js
import { TextField } from 'tailor-ui';
```

### Basic

```jsx live
<>
  <TextField
    label="Text Field"
    onChange={(event) => console.log(event.target.value)}
  />
  <TextField
    label="Text Field"
    onChange={(event) => console.log(event.target.value)}
  />
</>
```

### With maxLength

```jsx live
<TextField
  label="Text Field"
  maxLength={12}
  onChange={(event) => console.log(event.target.value)}
/>
```

### With textarea

```jsx live
<TextField
  textarea
  rows={2}
  maxRows={6}
  label="Text Field(textarea)"
  onChange={(event) => console.log(event.target.value)}
/>
```

### With textarea & maxLength

```jsx live
<TextField
  textarea
  rows={2}
  maxRows={6}
  maxLength={100}
  label="Text Field(textarea)"
  onChange={(event) => console.log(event.target.value)}
/>
```

### With textarea & error

```jsx live
() => {
  const [value, setValue] = useState('');

  return (
    <FormField validationMessage={value === 'error' ? 'Just show error' : null}>
      <TextField
        textarea
        rows={2}
        maxRows={6}
        label="Please type 'error'"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </FormField>
  );
};
```

### With maxLength & error

```jsx live
() => {
  const [value, setValue] = useState('');

  return (
    <FormField
      validator={[
        {
          rule: (value) => value === 'error1',
          message: 'error message',
        },
        {
          rule: (value) => value === 'error2',
          message: 'another error message',
        },
      ]}
    >
      <TextField
        label="Please type 'error1' or 'error2'"
        maxLength={12}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </FormField>
  );
};
```

### With empty label

```jsx live
<TextField
  maxLength={30}
  onChange={(event) => console.log(event.target.value)}
/>
```

### With controlled value switch

```jsx live
() => {
  const [on, setOn] = useState(false);

  return (
    <>
      <Button onClick={() => setOn(!on)}>Toggle</Button>
      <TextField
        value={on ? 'toggle' : 'after toggle'}
        maxLength={30}
        onChange={(event) => console.log(event.target.value)}
      />
    </>
  );
};
```

## API

| Property       | Description                         | Type      | Default |
| -------------- | ----------------------------------- | --------- | ------- |
| `label`        | The label text                      | `string`  |         |
| `value`        | value of the TextField              | `string`  |         |
| `defaultValue` | defaultValue of the TextField       | `string`  |         |
| `maxLength`    | The content max length of textfield | `number`  |         |
| `textarea`     | Whether the input is a textarea     | `boolean` | `false` |
| `disabled`     | Disabled the TextField              | `boolean` | `false` |

If you are using `textarea` props, you can consult [Input's documentation](Input.md#api) to find more
`textarea` APIs.
