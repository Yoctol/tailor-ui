---
id: checkbox
title: Checkbox
---

Checkbox component.

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## Examples

```js
import { Checkbox, CheckboxGroup } from 'tailor-ui';
```

### Checkbox

#### Basic

```jsx live
() => {
  const [on, set] = useState(false);

  return (
    <>
      <Checkbox defaultChecked>Uncontrolled Checkbox</Checkbox>
      <br />
      <Checkbox checked={on} onChange={() => set(!on)}>
        Controlled Checkbox
      </Checkbox>
    </>
  );
}
```

#### Use with FormField

```jsx live
<FormField
  required
  label="Checked Required"
  validator={boolean()
    .oneOf([true])
    .required()}
>
  <Checkbox>Click Me</Checkbox>
</FormField>
```

#### Disabled

```jsx live
<>
  <Checkbox checked disabled>
    Checked Disabled
  </Checkbox>
  <Checkbox disabled>Disabled</Checkbox>
</>
```

### CheckboxGroup

#### Basic

```jsx live
() => {
  const [value, set] = useState(['check_1']);

  return (
    <>
      <CheckboxGroup
        options={[
          { label: 'checkbox 1', value: 'check_1' },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3', disabled: true },
          { label: 'checkbox 4', value: 'check_4' },
        ]}
        value={value}
        onChange={set}
      />
      <br />
      <CheckboxGroup
        options={[
          { label: 'checkbox 1', value: 'check_1' },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3', disabled: true },
          { label: 'checkbox 4', value: 'check_4' },
        ]}
        defaultValue={['check_1']}
        onChange={console.log}
      />
    </>
  );
}
```

#### Controlled

```jsx live
() => {
  const [value, set] = useState([]);

  return (
    <>
      <CheckboxGroup
        options={[
          { label: 'checkbox 1', value: 'check_1' },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3' },
          { label: 'checkbox 4', value: 'check_4' },
        ]}
        value={value}
        onChange={set}
      />
      <br />
      <Button onClick={() => set(['check_1', 'check_2', 'check_3', 'check_4'])}>
        Select All
      </Button>
      <Button ml="2" onClick={() => set([])}>
        Unselect All
      </Button>
    </>
  );
}
```

#### Composition render

```jsx live
() => {
  const [value, set] = useState([]);

  return (
    <>
      <CheckboxGroup value={value} onChange={set}>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_1">checkbox 1</Checkbox>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_2">checkbox 2</Checkbox>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_3">checkbox 3</Checkbox>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_4">checkbox 4</Checkbox>
        </Box>
      </CheckboxGroup>
      <br />
      <CheckboxGroup defaultValue={['check_1']} onChange={console.log}>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_1">checkbox 1</Checkbox>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_2">checkbox 2</Checkbox>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_3">checkbox 3</Checkbox>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Checkbox value="check_4">checkbox 4</Checkbox>
        </Box>
      </CheckboxGroup>
    </>
  );
}
```

#### Direction

```jsx live
() => {
  const [value, set] = useState([]);

  return (
    <CheckboxGroup
      direction="vertical"
      options={[
        { label: 'checkbox 1', value: 'check_1' },
        { label: 'checkbox 2', value: 'check_2' },
        { label: 'checkbox 3', value: 'check_3' },
        { label: 'checkbox 4', value: 'check_4' },
      ]}
      value={value}
      onChange={set}
    />
  );
}
```

#### Use with FormField

```jsx live
<FormField
  required
  label="All Checked Required"
  validator={value =>
    value && value.length !== 4 ? 'Should checked all check box' : null
  }
>
  <CheckboxGroup
    defaultValue={['check_1']}
    options={[
      { label: 'checkbox 1', value: 'check_1' },
      { label: 'checkbox 2', value: 'check_2' },
      { label: 'checkbox 3', value: 'check_3' },
      { label: 'checkbox 4', value: 'check_4' },
    ]}
  />
</FormField>
```

## API

### Checkbox

| Property         | Description                                                          | Type                           | Default |
| ---------------- | -------------------------------------------------------------------- | ------------------------------ | ------- |
| `checked`        | Specifies whether the checkbox is selected                           | `boolean`                      |         |
| `defaultChecked` | Specifies the initial state whether or not the checkbox is selected. | `boolean`                      |         |
| `disabled`       | Disable Checkbox                                                     | `boolean`                      | false   |
| `onChange`       | The callback function that is triggered when the state changes       | `(event: ChangeEvent) => void` |         |
| `value`          | The value of checkbox                                                | `string`                       |         |
| `id`             | The id of checkbox                                                   | `string`                       |         |
| `onFocus`        |                                                                      | `(event: FocusEvent) => void`  |         |
| `onBlur`         |                                                                      | `(event: FocusEvent) => void`  |         |

### CheckboxGroup

| Property       | Description                                                    | Type                                                         | Default |
| -------------- | -------------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| `direction`    | to specify the direction of the step bar                       | `'horizontal'` `'vertical'`                                  |         |
| `defaultValue` | To set the initial value                                       | `string[]`                                                   |         |
| `options`      | Specifies options                                              | `{ label: ReactNode; value: string; disabled?: boolean; }[]` |         |
| `value`        | Used for setting the currently selected value                  | `string[]`                                                   |         |
| `onChange`     | The callback function that is triggered when the state changes | `(value: string[]) => void`                                  |         |
