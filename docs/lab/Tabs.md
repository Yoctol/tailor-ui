---
id: tabs
title: Tabs
---

Tabs make it easy to switch between different views.

## When To Use

Use tabs for functional aspects of a page.

## Examples

```js
import { Tabs } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <Box bg="primaryDark2" p="3" borderRadius="xl">
      <Tabs value={value} onChange={setValue}>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs>

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
  <Tabs size="sm" defaultValue="1">
    <Tabs.Tab value="1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="3">Tab 3</Tabs.Tab>
  </Tabs>

  <br />

  <Tabs defaultValue="1">
    <Tabs.Tab value="1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="3">Tab 3</Tabs.Tab>
  </Tabs>

  <br />

  <Tabs size="lg" defaultValue="1">
    <Tabs.Tab value="1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="3">Tab 3</Tabs.Tab>
  </Tabs>
</Box>
```

### With controlled activeValue

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <Box bg="primaryDark2" p="3" borderRadius="xl">
      <Tabs value={value} onChange={setValue}>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs>

      <br />

      <Tabs value={value} onChange={setValue}>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs>
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
      <Tabs type="card" value={value} onChange={setValue}>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs>

      <p>Active Tab is {value}</p>
    </>
  );
}
```

### Card type tab with size

```jsx live
<>
  <Tabs type="card" size="sm" defaultValue="1">
    <Tabs.Tab value="1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="3">Tab 3</Tabs.Tab>
  </Tabs>

  <br />

  <Tabs type="card" defaultValue="1">
    <Tabs.Tab value="1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="3">Tab 3</Tabs.Tab>
  </Tabs>

  <br />

  <Tabs type="card" size="lg" defaultValue="1">
    <Tabs.Tab value="1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="3">Tab 3</Tabs.Tab>
  </Tabs>
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
