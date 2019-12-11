---
id: icon
title: Icon
---

Semantic vector graphics.

## Examples

```js
import { Icon } from 'tailor-ui';
import { TiFlowChildren } from 'react-icons/ti';
import { MdEdit, MdComment, MdInput, MdInfo } from 'react-icons/md';
```

### Built-in

```jsx live
<>
  <Icon mx="2" type="line" />
  <Icon mx="2" type="messenger" />
  <Icon mx="2" type="robot" />
  <Icon mx="2" type="understood" />
  <Icon mx="2" type="kurator" />
  <Icon mx="2" type="touch" />
  <Icon mx="2" type="analytics" />
  <Icon mx="2" type="tags" />
  <Icon mx="2" type="settings" />
  <Icon mx="2" type="tutorial" />
  <Icon mx="2" type="info" />
  <Icon mx="2" type="success" />
  <Icon mx="2" type="warning" />
  <Icon mx="2" type="danger" />
</>
```

### With text

```jsx live
<Flex alignItems="center">
  This is a info icon <Icon ml="2" size="20" cursor="help" type={MdInfo} />
</Flex>
```

### Custom props

```jsx live
<>
  <Icon mx="2" fill="#00c300" type="line" />
  <Icon mx="2" fill="#0084ff" type="messenger" />
  <Icon mx="2" fill="primaryLight" size="32" type="understood" />
  <Icon mx="2" fill="primaryLight" size="32" type="kurator" />
  <Icon mx="2" fill="primaryLight" size="32" type="touch" />
  <Icon mx="2" fill="primaryLight" size="32" type="analytics" />
  <Icon mx="2" fill="primaryLight" size="32" type="tags" />
  <Icon mx="2" fill="primaryLight" size="32" type="settings" />
  <Icon mx="2" fill="primaryDark" size="48" type={MdEdit} />
  <Icon mx="2" fill="primaryDark" size="48" type={MdComment} />
  <Icon mx="2" fill="primaryDark" size="48" type={MdInput} />
  <Icon mx="2" fill="primaryDark" size="48" type={TiFlowChildren} />
</>
```

### react-icons

```jsx live
<>
  <Icon mx="2" type={MdEdit} />
  <Icon mx="2" type={MdComment} />
  <Icon mx="2" type={MdInput} />
  <Icon mx="2" type={TiFlowChildren} />
</>
```

### cursor

```jsx live
<>
  <Icon mx="2" type={MdEdit} />
  <Icon mx="2" cursor="pointer" type={MdComment} />
  <Icon mx="2" cursor="grab" type={MdInput} />
  <Icon mx="2" cursor="help" type={TiFlowChildren} />
</>
```

## API
