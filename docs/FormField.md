---
id: form-field
title: FormField
---

## Examples

```js
import { Select, Input, FormField } from 'tailor-ui';
```

### Use validationMessage with Input

```jsx live
<>
  <FormField label="Input" validationMessage="Error Message">
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
  <FormField required label="Required Input" validationMessage="Error Message">
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
</>
```

### Use validationMessage with controlled props

```jsx live
() => {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <Button onClick={() => setHasError(prev => !prev)}>
        {hasError ? 'Hide' : 'Show'} error on below input
      </Button>
      <br />
      <FormField
        label="Input"
        validationMessage={hasError ? 'Error Message' : null}
      >
        <Input placeholder="Placeholder" defaultValue="" />
      </FormField>
    </>
  );
}
```

### Use validationMessage with Select

```jsx live
<FormField required label="Select" validationMessage="Error Message">
  <Select
    defaultValue="Banana"
    options={['Banana', 'Orange', 'Apple', 'Mango']}
  />
</FormField>
```

### Use yup validator with Input

```jsx live
<>
  <FormField
    label="Please Type `error`"
    validator={string().test(
      'is-error',
      'Error Message',
      value => value !== 'error'
    )}
  >
    <Input defaultValue="valid input" placeholder="Placeholder" />
  </FormField>
  <FormField required label="Required Input" validator={string().required()}>
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
</>
```

### use function validator with Input

```jsx live
<>
  <FormField
    required
    label="Please Type `error`"
    validator={value => (value === 'error' ? 'Error Message' : null)}
  >
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
  <FormField
    required
    label="Please Type `error`"
    validator={value => (value === 'error' ? 'Error Message' : null)}
  >
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
</>
```

### Use function of array validator with Input

```jsx live
<>
  <FormField
    required
    label="Please Type `error1` or `error2`"
    validator={[
      {
        rule: value => value === 'error1',
        message: 'error message',
      },
      {
        rule: value => value === 'error2',
        message: 'another error message',
      },
    ]}
  >
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
  <FormField
    required
    label="Please Type `error1` or `error2`"
    validator={[
      {
        rule: value => value === 'error1',
        message: 'error message',
      },
      {
        rule: value => value === 'error2',
        message: 'another error message',
      },
    ]}
  >
    <Input placeholder="Placeholder" defaultValue="" />
  </FormField>
</>
```
