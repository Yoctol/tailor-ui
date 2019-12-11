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
import { Position } from 'tailor-ui';
import { Tooltip } from '@tailor-ui/lab';
```

### Basic

```jsx live
<Tooltip content="Tooltip Content">
  <Button>Hover me</Button>
</Tooltip>
```

### Position

```jsx live
<Flex justifyContent="space-between" mx="4">
  <Tooltip position={Position.TOP} content={<span>Tooltip Content</span>}>
    <Button>Top</Button>
  </Tooltip>

  <Tooltip position={Position.RIGHT} content={<span>Tooltip Content</span>}>
    <Button>Right</Button>
  </Tooltip>

  <Tooltip position={Position.BOTTOM} content={<span>Tooltip Content</span>}>
    <Button>Bottom</Button>
  </Tooltip>

  <Tooltip position={Position.LEFT} content={<span>Tooltip Content</span>}>
    <Button>Left</Button>
  </Tooltip>
</Flex>
```

### Use mouseEnterDelay and mouseLeaveDelay

```jsx live
<Tooltip
  position={Position.BOTTOM}
  content="Tooltip Content"
  mouseEnterDelay={500}
  mouseLeaveDelay={500}
>
  <Button>Hover me</Button>
</Tooltip>
```

### Controlled usage

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      content="Tooltip content"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```

### With defaultVisible

```jsx live
<Tooltip content="Tooltip content" defaultVisible>
  <Button>Hover me</Button>
</Tooltip>
```

## API
