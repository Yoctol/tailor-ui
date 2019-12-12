---
id: page-header
title: PageHeader
---

The header can be used to declare the page topic, display important information about the page that the user is interested in, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.)

## When To Use

It can also be used as inter-page navigation when it is needed to make the user quickly understand what the current page is and to facilitate the user to use the page function.

## Examples

```js
import { PageHeader } from 'tailor-ui';
```

### Basic

```jsx live
<Box boxShadow="xl">
  <PageHeader
    title="Project Name"
    breadcrumb={[
      {
        key: 'dashboard',
        id: 'Dashboard',
        onClick: () => {},
      },
    ]}
  />
</Box>
```

### with Breadcrumb

```jsx live
<Box bg="light" boxShadow="xl">
  <PageHeader
    title="Project Name"
    breadcrumb={[
      {
        key: '1',
        id: 'Page 1',
        onClick: () => {},
      },
      {
        key: '2',
        id: 'Page 2',
        onClick: () => {},
      },
    ]}
  />
</Box>
```

### with onBack

```jsx live
<Box bg="light" boxShadow="xl">
  <PageHeader
    title="Project Name"
    onBack={() => {}}
    breadcrumb={[
      {
        key: '1',
        id: 'Page 1',
        onClick: () => {},
      },
      {
        key: '2',
        id: 'Page 2',
        onClick: () => {},
      },
    ]}
  />
</Box>
```

### with extra

```jsx live
<Box bg="light" boxShadow="xl">
  <PageHeader
    onBack={() => {}}
    breadcrumb={[
      {
        key: 'list',
        id: 'Project List',
        onClick: () => {},
      },
      {
        key: 'create',
        id: 'Create Project',
        onClick: () => {},
      },
    ]}
    extra={<Box bg="gray200">This is Search Bar</Box>}
  />
</Box>
```

### overflow effect

```jsx live
<Box bg=" light" boxShadow="xl">
  <PageHeader
    title="Project Name is too long long long long long long long long"
    onBack={() => {}}
    breadcrumb={[
      {
        key: '1',
        id: 'Page 1 is too too long long long long long long long long',
        onClick: () => {},
      },
      {
        key: '2',
        id: 'Page 2 is too too long long long long long long long long',
        onClick: () => {},
      },
      {
        key: '3',
        id: 'Page 3 is too too long long long long long long long long',
        onClick: () => {},
      },
      {
        key: '4',
        id: 'Page 4 is too too long long long long long long long long',
        onClick: () => {},
      },
    ]}
  />
</Box>
```

### No lock breadcrumb item width

```jsx live
<Box bg="light" boxShadow="xl">
  <PageHeader
    title="Project Name"
    onBack={() => {}}
    breadcrumb={[
      {
        key: '1',
        id: 'Choose your plan to continue with all powerful features',
        onClick: () => {},
      },
    ]}
  />
</Box>
```

## API

| Property     | Description                                              | Type         | Default |
|--------------|----------------------------------------------------------|--------------|---------|
| `breadcrumb` | Breadcrumb configuration                                 | Breadcrumb   | `[]`    |
| `title`      | Header title                                             | `ReactNode`  |         |
| `extra`      | Operating area, at the end of the line of the title line | `ReactNode`  |         |
| `onBack`     | Back icon click event                                    | `() => void` |         |
