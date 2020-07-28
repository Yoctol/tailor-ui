---
id: checkbox-field
title: CheckboxField
---

## Usage

```jsx live
<Formik
  initialValues={{
    options: [],
  }}
  validationSchema={object().shape({
    options: array()
      .of(string().required())
      .required(),
  })}
  onSubmit={values => {
    console.log(JSON.stringify(values, null, 2));
  }}
>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <CheckboxField
        label="Options"
        name="options"
        required
        options={[
          { label: 'checkbox 1', value: 'check_1' },
          { label: 'checkbox 2', value: 'check_2' },
          { label: 'checkbox 3', value: 'check_3', disabled: true },
          { label: 'checkbox 4', value: 'check_4' },
        ]}
      />
      <Button type="submit">Submit</Button>
    </form>
  )}
</Formik>
```

## API

| Property   | Description             | Type        | Default |
|------------|-------------------------|-------------|---------|
| `label`    | label of checkbox field | `ReactNode` |         |
| `name`     | name of checkbox field  | `string`    |         |
| `required` | show `*` after label    | `boolean`   | `false` |

This component is based on checkbox group component, please check [it's documentation](Checkbox.md#checkboxgroup-1) for more usage.

