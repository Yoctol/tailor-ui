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
import { Radio } from 'tailor-ui';
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
  validator={boolean()
    .oneOf([true])
    .required()}
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

### Radio.Group

#### Basic

```jsx live
() => {
  const [value, setValue] = useState('radio-a');

  return (
    <>
      <Radio.Group
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
      <Radio.Group
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
}
```

#### Controlled

```jsx live
() => {
  const [value, setValue] = useState('radio-a');

  return (
    <>
      <Radio.Group
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
}
```

#### Composition render

```jsx live
() => {
  const [value, setValue] = useState('radio_1');

  return (
    <>
      <Radio.Group value={value} onChange={setValue}>
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
      </Radio.Group>
      <br />
      <Radio.Group defaultValue="radio_1" onChange={console.log}>
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
      </Radio.Group>
    </>
  );
}
```

#### Direction

```jsx live
() => {
  const [value, setValue] = useState('');

  return (
    <Radio.Group
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
}
```

#### Use with FormField

```jsx live
<FormField
  required
  label="Yes or No?"
  validator={value => (value !== 'yes' ? 'Should press yes' : null)}
>
  <Radio.Group
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

### Radio.Group