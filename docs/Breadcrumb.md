---
id: breadcrumb
title: Breadcrumb
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
- When the application has multi-layer architecture.

## Examples

```js
import { Breadcrumb } from 'tailor-ui';
```

### Basic

```jsx live
<Breadcrumb
  items={[
    {
      key: 'dashboard',
      name: 'Dashboard',
      onClick: () => {},
    },
  ]}
/>
```

### handle onClick

```jsx live
<Breadcrumb
  items={[
    {
      key: '1',
      name: 'Page 1',
      onClick: () => {},
    },
    {
      key: '2',
      name: 'Page 2',
      onClick: () => {},
    },
  ]}
/>
```

### Overflow

```jsx live
  <Breadcrumb
    items={[
      {
        key: '1',
        name: 'Page 1 is too too long long long long long long long long',
        onClick: () => {},
      },
      {
        key: '2',
        name: 'Page 2 is too too long long long long long long long long',
        onClick: () => {},
      },
      {
        key: '3',
        name: 'Page 3 is too too long long long long long long long long',
        onClick: () => {},
      },
      {
        key: '4',
        name: 'Page 4 is too too long long long long long long long long',
        onClick: () => {},
      },
    ]}
  />
```

## API

| Property | Description              | Type       | Default |
|----------|--------------------------|------------|---------|
| `items`  | Breadcrumb configuration | Breadcrumb | `[]`    |

### Breadcrumb item

| Property  | Description                             | Type                          | Default |
|-----------|-----------------------------------------|-------------------------------|---------|
| `key`     | key                                     | `string`                      |         |
| `name`    | display name                            | `ReactNode`                   |         |
| `onClick` | set the handler to handle `click` event | `(event: MouseEvent) => void` |         |
