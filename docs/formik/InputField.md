---
id: input-field
title: InputField
---

## Usage

```jsx live
<Formik
  initialValues={{
    title: '',
  }}
  validationSchema={object().shape({
    title: string().required(),
  })}
  onSubmit={values => {
    console.log(JSON.stringify(values, null, 2));
  }}
>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <InputField label="Title" name="title" required autoComplete="off" />
      <Button type="submit">Submit</Button>
    </form>
  )}
</Formik>
```

## API
