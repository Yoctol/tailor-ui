---
id: drawer
title: Drawer
---

Panel slides from screen edge.

## When To Use

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since that user can interact with the Drawer without leaving the current page, tasks can be achieved more efficient within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for Popover and we still want to keep the subtasks in the context of the main task, Drawer - comes very handy.

When a same Form is needed in multiple places.

## Examples

```js
import { Drawer } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer title="Title" visible={visible} onClose={() => setVisible(false)}>
        Content...
      </Drawer>
    </>
  );
}
```

### Custom Placement

```jsx live
() => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('left');

  return (
    <>
      <Radio.Group value={placement} onChange={setPlacement}>
        <Radio value="top">Top</Radio>
        <Radio value="right">Right (default)</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
      </Radio.Group>

      <Button mt="2" onClick={() => setVisible(!visible)}>
        Open
      </Button>

      <Drawer
        title="Title"
        visible={visible}
        placement={placement}
        onClose={() => setVisible(false)}
      >
        Content...
      </Drawer>
    </>
  );
}
```

### Add Custom Footer

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer
        title="Title"
        visible={visible}
        onClose={() => setVisible(false)}
        footer={
          <Button variant="primary" onClick={() => setVisible(false)}>
            Close Drawer
          </Button>
        }
      >
        Content...
      </Drawer>
    </>
  );
}
```

### hidden close button and prevent mask clicked close

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer
        title="Title"
        visible={visible}
        onClose={() => setVisible(false)}
        closable={false}
        maskClosable={false}
        footer={
          <Button variant="primary" onClick={() => setVisible(false)}>
            Close Drawer
          </Button>
        }
      >
        Content...
      </Drawer>
    </>
  );
}
```

## API
