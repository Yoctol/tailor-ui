---
id: radio
title: Radio
---

Radio.

## When To Use

- Used to select a single state in multiple options.
- The difference between Select is that Radio is visible to user and can facilitate the comparison of choice, which makes there shouldn't be too many of them.

## Examples

```js
import { Radio, RadioGroup } from 'tailor-ui';
```

### Radio

#### Basic

```jsx live
<>
  <Radio>Radio</Radio>
  <br />
  <Radio defaultChecked>Radio</Radio>
</>
```

#### Use with FormField

```jsx live
<FormField
  required
  label="Checked Required"
  validator={boolean().oneOf([true]).required()}
>
  <Radio>Click Me</Radio>
</FormField>
```

#### Disabled

```jsx live
<>
  <Radio checked disabled>
    Radio
  </Radio>
  <br />
  <Radio disabled>Disabled</Radio>
</>
```

### RadioGroup

#### Basic

```jsx live
() => {
  const [value, setValue] = useState('radio-a');

  return (
    <>
      <RadioGroup
        options={[
          { label: 'Radio A', value: 'radio-a' },
          { label: 'Radio B', value: 'radio-b' },
          { label: 'Radio C', value: 'radio-c', disabled: true },
          { label: 'Radio D', value: 'radio-d' },
        ]}
        value={value}
        onChange={setValue}
      />
      <br />
      <RadioGroup
        options={[
          { label: 'Radio A', value: 'radio-a' },
          { label: 'Radio B', value: 'radio-b' },
          { label: 'Radio C', value: 'radio-c', disabled: true },
          { label: 'Radio D', value: 'radio-d' },
        ]}
        defaultValue="radio-b"
        onChange={console.log}
      />
    </>
  );
};
```

#### Controlled

```jsx live
() => {
  const [value, setValue] = useState('radio-a');

  return (
    <>
      <RadioGroup
        options={[
          { label: 'Radio A', value: 'radio-a' },
          { label: 'Radio B', value: 'radio-b' },
          { label: 'Radio C', value: 'radio-c', disabled: true },
          { label: 'Radio D', value: 'radio-d' },
        ]}
        value={value}
        onChange={setValue}
      />
      <br />
      <Button onClick={() => setValue('radio-d')}>Check last one</Button>
    </>
  );
};
```

#### Composition render

```jsx live
() => {
  const [value, setValue] = useState('radio_1');

  return (
    <>
      <RadioGroup value={value} onChange={setValue}>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_1">radio 1</Radio>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_2">radio 2</Radio>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_3">radio 3</Radio>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_4">radio 4</Radio>
        </Box>
      </RadioGroup>
      <br />
      <RadioGroup defaultValue="radio_1" onChange={console.log}>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_1">radio 1</Radio>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_2">radio 2</Radio>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_3">radio 3</Radio>
        </Box>
        <Box bg="gray300" p="2" m="2">
          <Radio value="radio_4">radio 4</Radio>
        </Box>
      </RadioGroup>
    </>
  );
};
```

#### Direction

```jsx live
() => {
  const [value, setValue] = useState('');

  return (
    <RadioGroup
      direction="vertical"
      options={[
        { label: 'radio 1', value: 'radio_1' },
        { label: 'radio 2', value: 'radio_2' },
        { label: 'radio 3', value: 'radio_3' },
        { label: 'radio 4', value: 'radio_4' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};
```

#### Use with FormField

```jsx live
<FormField
  required
  label="Yes or No?"
  validator={(value) => (value !== 'yes' ? 'Should press yes' : null)}
>
  <RadioGroup
    defaultValue="no"
    options={[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]}
  />
</FormField>
```

## API

### Radio

| Property         | Description                                                       | Type                           | Default |
| ---------------- | ----------------------------------------------------------------- | ------------------------------ | ------- |
| `checked`        | Specifies whether the Radio is selected                           | `boolean`                      |         |
| `defaultChecked` | Specifies the initial state: whether or not the Radio is selected | `boolean`                      |         |
| `disabled`       | Disable Radio                                                     | `boolean`                      | false   |
| `onChange`       | The callback function that is triggered when the state changes    | `(event: ChangeEvent) => void` |         |
| `value`          | The value of radio                                                | `string`                       |         |
| `id`             | The id of radio                                                   | `string`                       |         |
| `onFocus`        |                                                                   | `(event: FocusEvent) => void`  |         |
| `onBlur`         |                                                                   | `(event: FocusEvent) => void`  |         |

### RadioGroup

| Property       | Description                                                    | Type                                                         | Default |
| -------------- | -------------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| `direction`    | to specify the direction of the step bar                       | `'horizontal'` `'vertical'`                                  |         |
| `defaultValue` | To set the initial value                                       | `string[]`                                                   |         |
| `options`      | Specifies options                                              | `{ label: ReactNode; value: string; disabled?: boolean; }[]` |         |
| `value`        | Used for setting the currently selected value                  | `string[]`                                                   |         |
| `onChange`     | The callback function that is triggered when the state changes | `(value: string[]) => void`                                  |         |
