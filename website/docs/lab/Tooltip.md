---
id: tooltip
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## Examples

```js
import { Tooltip } from 'tailor-ui/lab';
```

### Basic

```jsx live
<Lab.Tooltip content="Tooltip Content">
  <Button>Hover me</Button>
</Lab.Tooltip>
```

### Stack

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        closable
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Lab.Tooltip content="Tooltip Content">
          <span>Hover Me!</span>
        </Lab.Tooltip>
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

## API


| Property  | Description                                      | Type        | Default |
|-----------|--------------------------------------------------|-------------|---------|
| `content` | A string or react component inside this tooltip. | `ReactNode` |         |
