---
id: radio-field
title: RadioField
---

## Usage

```jsx live
<Formik
  initialValues={{
    option: '',
  }}
  validationSchema={object().shape({
    option: string().required(),
  })}
  onSubmit={values => {
    console.log(JSON.stringify(values, null, 2));
  }}
>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <RadioField
        label="Option"
        name="option"
        required
        options={[
          { label: 'Radio A', value: 'radio-a' },
          { label: 'Radio B', value: 'radio-b' },
          { label: 'Radio C', value: 'radio-c', disabled: true },
          { label: 'Radio D', value: 'radio-d' },
        ]}
      />
      <Button type="submit">Submit</Button>
    </form>
  )}
</Formik>
```

## API

| Property   | Description          | Type        | Default |
|------------|----------------------|-------------|---------|
| `label`    | label of radio field | `ReactNode` |         |
| `name`     | name of radio field  | `string`    |         |
| `required` | show `*` after label | `boolean`   | `false` |

This component is based on radio group component, please check [it's documentation](Radio.md#radiogroup-1) for more usage.
