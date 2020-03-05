---
id: badge
title: Badge
---

Small numerical value or status descriptor for UI elements.

## When To Use

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

## Examples

```js
import { Badge } from 'tailor-ui';
```

### Basic

```jsx live
<Badge count={2}>
  <Button variant="normal" icon={MdNotifications} />
</Badge>
```

### Standalone

```jsx live
<Flex alignItems="center">
  <Heading.h4 mr="2px">Notifications</Heading.h4>
  <Badge count={2} />
</Flex>
```

### Customized color

```jsx live
<>
  <Badge count={16} bg="success" wrapperProps={{ mr: '3' }}>
    <Button variant="normal" icon={MdNotifications} />
  </Badge>
  <Badge count={100} bg="light" color="gray500" borderColor="gray100">
    <Button variant="normal" icon={MdNotifications} />
  </Badge>
</>
```

### Overflow count

```jsx live
<>
  <Badge count={99} wrapperProps={{ mr: '3' }}>
    <Button variant="normal" icon={MdNotifications} />
  </Badge>
  <Badge count={100} wrapperProps={{ mr: '3' }}>
    <Button variant="normal" icon={MdNotifications} />
  </Badge>
  <Badge count={99} overflowCount={10} wrapperProps={{ mr: '3' }}>
    <Button variant="normal" icon={MdNotifications} />
  </Badge>
  <Badge count={1000} overflowCount={999} wrapperProps={{ mr: '3' }}>
    <Button variant="normal" icon={MdNotifications} />
  </Badge>
</>
```

## API

| Property        | Description             | Type     | Default |
|-----------------|-------------------------|----------|---------|
| `count`         | Number to show in badge | `number` |         |
| `overflowCount` | Max count to show       | `number` | 99      |
| `wrapperProps`  | Props of badge wrapper  | BoxProps |         |
| `color`         | Count color             | string   |         |
| `bg`            | background color        | string   |         |
| `borderColor`   | border color            | string   |         |
