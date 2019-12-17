---
id: textarea-field
title: TextareaField
---

## Usage

```jsx live
<Formik
  initialValues={{
    description: '',
  }}
  validationSchema={object().shape({
    description: string().required(),
  })}
  onSubmit={values => {
    console.log(JSON.stringify(values, null, 2));
  }}
>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <TextareaField
        label="Description"
        name="description"
        required
        autoComplete="off"
      />
      <Button type="submit">Submit</Button>
    </form>
  )}
</Formik>
```

## API

| Property   | Description             | Type        | Default |
|------------|-------------------------|-------------|---------|
| `label`    | label of textarea field | `ReactNode` |         |
| `name`     | name of textarea field  | `string`    |         |
| `required` | show `*` after label    | `boolean`   | `false` |

This component is based on textarea component, please check [it's documentation](Input.md#textarea-1) for more usage.
