---
id: select
title: Select
---

Select component to select value from options.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](Radio.md) is recommended when there are fewer total options (less than 5).

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
      onChange={(newValue) => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple', disabled: true },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
};
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
        onChange={(newValue) => setValue(newValue)}
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
        onChange={(newValue) => setValue(newValue)}
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
        onChange={(newValue) => setValue(newValue)}
        options={[
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Apple', value: 'apple' },
          { label: 'Mango', value: 'mango' },
        ]}
      />
    </div>
  );
};
```

### Searchable

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Select
      searchable
      value={value}
      onChange={(newValue) => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
};
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
      onChange={(newValue) => setValue(newValue)}
      options={options}
      isValidNewOption={(name) =>
        !options.map((option) => option.label).includes(name) &&
        name.trim() !== ''
      }
      onCreateOption={(name) => {
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
};
```

### disabled

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Select
      disabled
      value={value}
      onChange={(newValue) => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
};
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
      onChange={(newValue) => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ]}
    />
  );
};
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
      onChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
      options={defaultItems}
    />
  );
};
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
      onChange={(newValue) => setValue(newValue)}
      options={options}
      isValidNewOption={(name) =>
        !options.map((option) => option.label).includes(name) &&
        name.trim() !== ''
      }
      onCreateOption={(name) => {
        const newOption = { label: name, value: name };
        setLoading(true);
        setTimeout(() => {
          setOptions([...options, newOption]);
          setValue((prevValue) => [...prevValue, newOption]);
          setLoading(false);
        }, 1000);
      }}
    />
  );
};
```

## API

| Property            | Description                                                                                                                                                                                             | Type                                                                             | Default                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| `id`                | Id of select                                                                                                                                                                                            | `string`                                                                         |                                        |
| `name`              | Name of select                                                                                                                                                                                          | `string`                                                                         |                                        |
| `className`         | ClassName of select                                                                                                                                                                                     | `string`                                                                         |                                        |
| `width`             | Width of select                                                                                                                                                                                         | `string` \| `number`                                                             | 240                                    |
| `size`              | Select size                                                                                                                                                                                             | `'sm'` \| `'md'` \| `'lg'`                                                       | `'md'`                                 |
| `creatable`         | Create new option with input text if true                                                                                                                                                               | `boolean`                                                                        | `false`                                |
| `clearable`         | Show clear button.                                                                                                                                                                                      | `boolean`                                                                        | `false`                                |
| `disabled`          | Whether disabled select                                                                                                                                                                                 | `boolean`                                                                        | `false`                                |
| `loading`           | Is the select in a state of loading                                                                                                                                                                     | `boolean`                                                                        | `false`                                |
| `multiple`          | Support multiple selected options                                                                                                                                                                       | `boolean`                                                                        | `false`                                |
| `searchable`        | Whether to enable search functionality                                                                                                                                                                  | `boolean`                                                                        | `false`                                |
| `options`           | The options of select                                                                                                                                                                                   | `Option[]`                                                                       | `[]`                                   |
| `value`             | Current selected option                                                                                                                                                                                 | `Option` \| `Option[]`                                                           |                                        |
| `defaultValue`      | Initial selected option                                                                                                                                                                                 | `Option` \|` Option[]`                                                           |                                        |
| `placeholder`       | Placeholder of select                                                                                                                                                                                   | `string`                                                                         |                                        |
| `menu`              | Render additional menu after options                                                                                                                                                                    | `ReactNode`                                                                      |                                        |
| `itemSize`          | Size of menu option                                                                                                                                                                                     | `number`                                                                         | 36                                     |
| `optionsMaxHeight`  | Maximum height of the menu before scrolling                                                                                                                                                             | `number`                                                                         | 180                                    |
| `onChange`          | Called when select an option or input value change                                                                                                                                                      | `(option: Option \| Option[]) => void`                                           |                                        |
| `onBlur`            | Called when blur                                                                                                                                                                                        | `(event: FocusEvent) => void`                                                    |                                        |
| `noOptionsMessage`  | Text to display when there are no options                                                                                                                                                               | `() => ReactNode`                                                                |                                        |
| `formatCreateLabel` | Gets the label for the "create new option ..." option in the menu. Is given the current input value.                                                                                                    | `(labelInfo: { value: string; active: boolean; hovered: boolean }) => ReactNode` | `value => Create new option: ${value}` |
| `isValidNewOption`  | Determines whether the "create new option ..." option should be displayed based on the current input value, select value and options array.                                                             | `(value: string) => boolean`                                                     | `value => value.trim() !== ''`         |
| `onCreateOption`    | If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created | `(value: string) => void`                                                        |                                        |
