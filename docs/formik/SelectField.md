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
