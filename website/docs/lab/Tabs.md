---
id: tabs
title: Tabs
---

Tabs make it easy to switch between different views.

## When To Use

Use tabs for functional aspects of a page.

## Examples

```js
import { Tabs } from 'tailor-ui/lab';
```

### Basic

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <Box bg="primaryDark2" p="3" borderRadius="xl">
      <Lab.Tabs value={value} onChange={setValue}>
        <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
      </Lab.Tabs>

      <Box color="light">
        <p>Active Tab is {value}</p>
      </Box>
    </Box>
  );
}
```

### With size

```jsx live
<Box bg="primaryDark2" p="3" borderRadius="xl">
  <Lab.Tabs size="sm" defaultValue="1">
    <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
  </Lab.Tabs>

  <br />

  <Lab.Tabs defaultValue="1">
    <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
  </Lab.Tabs>

  <br />

  <Lab.Tabs size="lg" defaultValue="1">
    <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
  </Lab.Tabs>
</Box>
```

### With controlled activeValue

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <Box bg="primaryDark2" p="3" borderRadius="xl">
      <Lab.Tabs value={value} onChange={setValue}>
        <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
      </Lab.Tabs>

      <br />

      <Lab.Tabs value={value} onChange={setValue}>
        <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
      </Lab.Tabs>
    </Box>
  );
}
```

### Card type tab

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <>
      <Lab.Tabs type="card" value={value} onChange={setValue}>
        <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
        <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
      </Lab.Tabs>

      <p>Active Tab is {value}</p>
    </>
  );
}
```

### Card type tab with size

```jsx live
<>
  <Lab.Tabs type="card" size="sm" defaultValue="1">
    <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
  </Lab.Tabs>

  <br />

  <Lab.Tabs type="card" defaultValue="1">
    <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
  </Lab.Tabs>

  <br />

  <Lab.Tabs type="card" size="lg" defaultValue="1">
    <Lab.Tabs.Tab value="1">Tab 1</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="2">Tab 2</Lab.Tabs.Tab>
    <Lab.Tabs.Tab value="3">Tab 3</Lab.Tabs.Tab>
  </Lab.Tabs>
</>
```

## API

### Tabs

| Property       | Description                                              | Type                            | Default  |
|----------------|----------------------------------------------------------|---------------------------------|----------|
| `defaultValue` | Initial active Tab's value, if `activeValue` is not set. | `string`                        |          |
| `value`        | Current Tab's value                                      | `string`                        |          |
| `onChange`     | Callback executed when active tab is changed             | `(activeValue: string) => void` |          |
| `size`         | Preset tab bar size                                      | `'sm'` \| `'md'` \| `'lg'`      | `'md'`   |
| `type`         | Type of tab                                              | `'line'` \| `'card'`            | `'line'` |

### Tabs.Tab

| Property | Description | Type     | Default |
|----------|-------------|----------|---------|
| `value`  | Tab's value | `string` |         |
