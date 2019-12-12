---
id: alert
title: Alert
---

Alert component for feedback.

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## Examples

```js
import { Alert } from 'tailor-ui';
```

### Basic

```jsx live
<Alert message="Info Text" />
```

### With type

```jsx live
<>
  <Alert message="Info Text" type="info" />
  <Alert message="Success Text" type="success" />
  <Alert message="Warning Text" type="warning" />
  <Alert message="Error Text" type="error" />
</>
```

### With closable

```jsx live
<Alert closable message="Info Text" onClosed={() => alert('alert closed!')} />
```

## API

| Property   | Description | Type                                                | Default  |
| ---------- | ----------- | --------------------------------------------------- | -------- |
| `closable` |             | `boolean`                                           | `false`  |
| `type`     |             | `'info'` \| `'success'` \| `'error'` \| `'warning'` | `'info'` |
| `message`  |             | `ReactNode`                                         |          |
| `onClose`  |             | `() => void`                                        |          |
| `onClosed` |             | `() => void`                                        |          |
