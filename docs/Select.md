---
id: select
title: Select
---

Select component to select value from options.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing <Link to="/components/radio">Radio</Link> is recommended when there are fewer total options (less than 5).

## Examples

```js
import { Select } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Select
      value={value}
      onChange={newValue => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
}
```

### other sizes

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <div>
      <Select
        size="sm"
        value={value}
        onChange={newValue => setValue(newValue)}
        options={[
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Apple', value: 'apple' },
          { label: 'Mango', value: 'mango' },
        ]}
      />
      <br />
      <br />
      <Select
        value={value}
        onChange={newValue => setValue(newValue)}
        options={[
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Apple', value: 'apple' },
          { label: 'Mango', value: 'mango' },
        ]}
      />
      <br />
      <br />
      <Select
        size="lg"
        value={value}
        onChange={newValue => setValue(newValue)}
        options={[
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Apple', value: 'apple' },
          { label: 'Mango', value: 'mango' },
        ]}
      />
    </div>
  );
}
```

### Searchable

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Select
      searchable
      value={value}
      onChange={newValue => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
}
```

### Creatable

```jsx live
() => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });
  const [options, setOptions] = useState([
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ]);

  return (
    <Select
      creatable
      loading={loading}
      value={value}
      onChange={newValue => setValue(newValue)}
      options={options}
      isValidNewOption={name =>
        !options.map(option => option.label).includes(name) &&
        name.trim() !== ''
      }
      onCreateOption={name => {
        const newOption = { label: name, value: name };
        setLoading(true);
        setTimeout(() => {
          setOptions([...options, newOption]);
          setValue(newOption);
          setLoading(false);
        }, 1000);
      }}
    />
  );
}
```

### disabled

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Select
      disabled
      value={value}
      onChange={newValue => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
}
```

### With placeholder & clearable

```jsx live
() => {
  const [value, setValue] = useState(null);

  return (
    <Select
      clearable
      placeholder="どれ"
      value={value}
      onChange={newValue => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
}
```

### Large items & custom menu

```jsx live
() => {
  const defaultItems = Array.from({ length: 9999 })
    .fill(0)
    .map((_, index) => ({
      label: `item #${index}`,
      value: String(index),
    }));

  const [value, setValue] = useState({ label: 'item #9527', value: '9527' });

  return (
    <Select
      value={value}
      menu={
        <div style={{ padding: 8, borderTop: '1px solid #efefef' }}>
          I am cutsom menu!
        </div>
      }
      onChange={newValue => {
        console.log(newValue);
        setValue(newValue);
      }}
      options={defaultItems}
    />
  );
}
```

### Multiple

```jsx live
() => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([{ label: 'Banana', value: 'banana' }]);
  const [options, setOptions] = useState([
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ]);

  return (
    <Select
      creatable
      loading={loading}
      width="360px"
      multiple
      value={value}
      onChange={newValue => setValue(newValue)}
      options={options}
      isValidNewOption={name =>
        !options.map(option => option.label).includes(name) &&
        name.trim() !== ''
      }
      onCreateOption={name => {
        const newOption = { label: name, value: name };
        setLoading(true);
        setTimeout(() => {
          setOptions([...options, newOption]);
          setValue(prevValue => [...prevValue, newOption]);
          setLoading(false);
        }, 1000);
      }}
    />
  );
}
```

## API
