---
id: dropdown
title: Dropdown
---

A dropdown list.

## When To Use

If there are too many operations to display, you can wrap them in a `Dropdown`. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.

## Examples

```js
import { Dropdown } from 'tailor-ui';
```

### Basic usage

```jsx live
<Dropdown
  overlay={
    <Dropdown.List>
      <Dropdown.Item>close when click</Dropdown.Item>
      <Dropdown.Item keep>keep dropdown when click</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item disabled>disabled</Dropdown.Item>
      <Dropdown.Item color="danger">delete</Dropdown.Item>
    </Dropdown.List>
  }
>
  <Button>Toggle</Button>
</Dropdown>
```

### With icon

```jsx live
<Dropdown
  overlay={
    <Dropdown.List>
      <Dropdown.Item>normal</Dropdown.Item>
      <Dropdown.Item icon="open-in-new">with open in new icon</Dropdown.Item>
      <Dropdown.Item icon="tutorial">with tutorial icon</Dropdown.Item>
    </Dropdown.List>
  }
>
  <Button>Toggle</Button>
</Dropdown>
```

### Get visible

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <Dropdown
      onVisibleChange={setVisible}
      overlay={
        <Dropdown.List>
          <Dropdown.Item>close when click</Dropdown.Item>
          <Dropdown.Item keep>keep dropdown when click</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item disabled>disabled</Dropdown.Item>
          <Dropdown.Item color="danger">delete</Dropdown.Item>
        </Dropdown.List>
      }
    >
      <Button variant={visible ? 'primary' : 'regular'}>Toggle</Button>
    </Dropdown>
  );
};
```

### Cascading menu

```jsx live
<Dropdown
  overlay={
    <Dropdown.List>
      <Dropdown.Item>Rename</Dropdown.Item>
      <Dropdown.SubList title="Move">
        {range(1, 20).map((key) => (
          <Dropdown.Item
            key={key}
            onClick={() => console.log(`move to Group ${key}`)}
          >
            Group {key}
          </Dropdown.Item>
        ))}
      </Dropdown.SubList>
      <Dropdown.Divider />
      <Dropdown.SubList title="Share">
        <Dropdown.Item onClick={() => console.log('share to facebook')}>
          Share to Facebook
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('share to twitter')}>
          Share to Twitter
        </Dropdown.Item>
      </Dropdown.SubList>
      <Dropdown.Divider />
      <Dropdown.Item>Delete</Dropdown.Item>
    </Dropdown.List>
  }
>
  <Button>Toggle</Button>
</Dropdown>
```

## API

### Dropdown

| Property  | Description | Type        | Default |
| --------- | ----------- | ----------- | ------- |
| `overlay` |             | `ReactNode` |         |

### Dropdown.Item

| Property   | Description                        | Type                          | Default |
| ---------- | ---------------------------------- | ----------------------------- | ------- |
| `onClick`  | Callback for click                 | `(event: MouseEvent) => void` |         |
| `disabled` | Disabled the item                  | `boolean`                     | `false` |
| `keep`     | Keep the dropdown after click item | `boolean`                     | `false` |

### Dropdown.SubList

| Property   | Description       | Type      | Default |
| ---------- | ----------------- | --------- | ------- |
| `title`    |                   | `string`  |         |
| `disabled` | Disabled the item | `boolean` | `false` |
