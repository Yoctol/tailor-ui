---
id: input
title: Input
---

A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

## Examples

```js
import { Input, Textarea, FormField } from 'tailor-ui';
```

### Input

#### Basic

```jsx live
<Input placeholder="placeholder" />
```

#### AutoSelect

```jsx live
<Input
  autoSelect
  defaultValue="Example default value"
  placeholder="placeholder"
/>
```

#### With FormField & Label

```jsx live
<FormField label="Label">
  <Input placeholder="placeholder" />
</FormField>
```

#### With errors

```jsx live
<FormField label="With Error" validationMessage="Something went wrong!">
  <Input placeholder="none status" />
</FormField>
```

#### With disabled

```jsx live
<FormField label="Disabled">
  <Input placeholder="placeholder" disabled />
</FormField>
```

#### With size

```jsx live
<>
  <FormField label="sm">
    <Input size="sm" placeholder="placeholder" />
  </FormField>
  <FormField label="md (default)">
    <Input size="md" placeholder="placeholder" />
  </FormField>
  <FormField label="lg">
    <Input size="lg" placeholder="placeholder" />
  </FormField>
</>
```

### Prefix an Suffix

```jsx live
<>
  <Input prefix="Prefix" defaultValue="" />

  <Box mt="2">
    <Input suffix="Suffix" defaultValue="" />
  </Box>

  <Box mt="2">
    <Input suffix={<Button type="success">Send It</Button>} defaultValue="" />
  </Box>

  <Box mt="2">
    <Input prefix="https://" suffix=".com" defaultValue="yoctol" />
  </Box>

  <Box mt="2">
    <Input
      prefix={
        <>
          <Icon type={MdAccountCircle} size="20" mr="1" />
          username:
        </>
      }
      defaultValue="yoctol"
    />
  </Box>
</>
```

#### focus and blur with ref

```jsx live
() => {
  const ref = useRef();

  return (
    <>
      <Input
        ref={ref}
        onPressEnter={() => {
          ref.current.blur();
        }}
      />
      <Button mt="2" onClick={() => ref.current.focus()}>
        Focus
      </Button>
    </>
  );
}
```

### Textarea

#### Basic

```jsx live
<FormField label="demo">
  <Textarea placeholder="placeholder" />
</FormField>
```

#### With rows & maxRows

```jsx live
<FormField label="With rows & maxRows:">
  <Textarea placeholder="placeholder" rows={3} maxRows={6} />
</FormField>
```

## API

### Input

### Textarea
