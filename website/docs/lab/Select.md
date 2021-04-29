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
import { Select } from 'tailor-ui/lab';
```

### Basic

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  const options = [
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange', hint: 'HINT FOR ORANGE' },
    { label: 'Apple', value: 'apple', disabled: true },
    { label: 'Mango', value: 'mango' },
  ];

  return (
    <>
      <Heading.H5>Controlled</Heading.H5>
      <Lab.Select
        value={value}
        onChange={(newValue) => setValue(newValue)}
        options={options}
      />

      <br />

      <Heading.H5>Uncontrolled</Heading.H5>
      <Lab.Select
        onChange={(newValue) => console.log(newValue)}
        defaultValue={{ label: 'Banana', value: 'banana' }}
        options={options}
      />
    </>
  );
};
```

### Searchable

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Lab.Select
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

### Async Search

try to search `react`:

```jsx live
() => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  const handleSearchGitHubRepository = useMemo(() =>
    debounce(async (searchValue = '') => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchValue}`,
        {
          method: 'GET',
        }
      ).then((res) => res.json());

      setOptions(
        response.items
          ? response.items.map((item) => ({
              value: item.id,
              label: item.full_name,
            }))
          : []
      );
    }, 500)
  );

  return (
    <Lab.Select
      searchable
      value={value}
      onChange={(newValue) => setValue(newValue)}
      onSearch={handleSearchGitHubRepository}
      options={options}
    />
  );
};
```

### disabled

```jsx live
() => {
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });

  return (
    <Lab.Select
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
    <Lab.Select
      clearable
      placeholder="どれ"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      options={[
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
        { label: 'VERY VERY VERY VERY VERY VERY VERY LONG', value: 'mango' },
      ]}
    />
  );
};
```

### Virtual scroll

```jsx live
() => {
  const options = Array.from({ length: 99999 })
    .fill(0)
    .map((_, index) => ({
      label: `item #${index}`,
      value: String(index),
    }));

  const [value, setValue] = useState({ label: 'item #9527', value: '9527' });

  return (
    <Lab.Select
      searchable
      options={options}
      value={value}
      onChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
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
    <Lab.Select
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

### Stack

```jsx live
() => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({ label: 'Banana', value: 'banana' });
  const options = [
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Apple', value: 'apple', disabled: true },
    { label: 'Mango', value: 'mango' },
  ];

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        closable
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Lab.Select
          value={value}
          onChange={(newValue) => setValue(newValue)}
          options={options}
        />
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
};
```

## Multiple Select

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
    <Lab.MultipleSelect
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
| `width`             | Width of select                                                                                                                                                                                         | `string` \| `number`                                                             | 240                                    |
| `creatable`         | Create new option with input text if true                                                                                                                                                               | `boolean`                                                                        | `false`                                |
| `clearable`         | Show clear button.                                                                                                                                                                                      | `boolean`                                                                        | `false`                                |
| `disabled`          | Whether disabled select                                                                                                                                                                                 | `boolean`                                                                        | `false`                                |
| `loading`           | Is the select in a state of loading                                                                                                                                                                     | `boolean`                                                                        | `false`                                |
| `searchable`        | Whether to enable search functionality                                                                                                                                                                  | `boolean`                                                                        | `false`                                |
| `options`           | The options of select                                                                                                                                                                                   | `Option[]`                                                                       | `[]`                                   |
| `value`             | Current selected option                                                                                                                                                                                 | `Option`                                                                         |                                        |
| `defaultValue`      | Initial selected option                                                                                                                                                                                 | `Option`                                                                         |                                        |
| `placeholder`       | Placeholder of select                                                                                                                                                                                   | `string`                                                                         |                                        |
| `onChange`          | Called when select an option or input value change                                                                                                                                                      | `(option: Option \| Option[]) => void`                                           |                                        |
| `onBlur`            | Called when blur                                                                                                                                                                                        | `(event: FocusEvent) => void`                                                    |                                        |
| `noOptionsMessage`  | Text to display when there are no options                                                                                                                                                               | `() => ReactNode`                                                                |                                        |
| `formatCreateLabel` | Gets the label for the "create new option ..." option in the menu. Is given the current input value.                                                                                                    | `(labelInfo: { value: string; active: boolean; hovered: boolean }) => ReactNode` | `value => Create new option: ${value}` |
| `isValidNewOption`  | Determines whether the "create new option ..." option should be displayed based on the current input value, select value and options array.                                                             | `(value: string) => boolean`                                                     | `value => value.trim() !== ''`         |
| `onCreateOption`    | If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created | `(value: string) => void`                                                        |                                        |
