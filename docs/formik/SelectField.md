---
id: select-field
title: SelectField
---

## Usage

```jsx live
<Formik
  initialValues={{
    fruit: 'banana',
  }}
  validationSchema={object().shape({
    fruit: string()
      .oneOf(['banana', 'orange', 'apple', 'mango'])
      .required(),
  })}
  onSubmit={values => {
    console.log(JSON.stringify(values, null, 2));
  }}
>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <SelectField
        label="Fruit"
        name="fruit"
        clearable
        required
        options={[
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Apple', value: 'apple' },
          { label: 'Mango', value: 'mango' },
        ]}
      />
      <Button type="submit">Submit</Button>
    </form>
  )}
</Formik>
```

## API

| Property   | Description           | Type        | Default |
|------------|-----------------------|-------------|---------|
| `label`    | label of select field | `ReactNode` |         |
| `name`     | name of select field  | `string`    |         |
| `required` | show `*` after label  | `boolean`   | `false` |

This component is based on select component, please check [it's documentation](Select.md#api) for more usage.
