---
id: popconfirm
title: Popconfirm
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

## Examples

```js
import { Popconfirm } from 'tailor-ui';
```

### Basic

```jsx live
<Popconfirm
  position={Position.RIGHT}
  content="Are you sure to delete this todo?"
  onConfirm={() => console.log('confirm')}
  onCancel={() => console.log('cancel')}
>
  <Button>Button</Button>
</Popconfirm>
```

### With customize text & type

```jsx live
() => {
  const modal = useModal();
  const message = useMessage();

  return (
    <Popconfirm
      position={Position.RIGHT}
      type="error"
      confirmText="毀了它"
      cancelText="一小時後再提醒我"
      content="此操作將會毀滅本系統，你確定？"
      onConfirm={() => {
        console.log('confirm');
        message.success('您的系統已被毀滅');
      }}
      onCancel={() => {
        modal.success({
          title: '我才不會提醒你',
          content: '您的系統已被毀滅',
          confirmText: '感謝',
        });
        console.log('cancel');
      }}
    >
      <Button>Button</Button>
    </Popconfirm>
  );
}
```

## API

| Property          | Description                                    | Type                                                | Default     |
|-------------------|------------------------------------------------|-----------------------------------------------------|-------------|
| `content`         | content of the confirmation box                | `ReactNode`                                         |             |
| `type`            | customize icon of confirmation                 | `'info'` \| `'success'` \| `'error'` \| `'warning'` | `'warning'` |
| `cancelText`      | text of the Cancel button                      | `string`                                            |    Cancel         |
| `confirmText`     | text of the Confirm button                     | `string`                                            |     Confirm        |
| `onCancel`        | callback of cancel                             | `(event: MouseEvent) => void`                       |             |
| `onConfirm`       | callback of confirmation                       | `(event: MouseEvent) => void`                       |             |

Consult [Popover's documentation](Popover.md#api) to find more APIs.
