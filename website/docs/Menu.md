---
id: menu
title: Menu
---

Menu list of Navigation.

## When To Use

Navigation menu is important for a website, it helps users jump from one site section to another quickly. Mostly, it includes top navigation and side navigation. Top navigation provides all the category and functions of the website. Side navigation provides the Multi-level structure of the website.

## Examples

```js
import { Menu } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <Menu>
      <Menu.SubMenu id="understood" title="Group 1" icon="understood">
        <Menu.Item active={value === '1'} onClick={() => setValue('1')}>
          Item 1
        </Menu.Item>
        <Menu.Item active={value === '2'} onClick={() => setValue('2')}>
          Item 2
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu id="kurator" title="Group 2" icon="kurator">
        <Menu.Item active={value === '3'} onClick={() => setValue('3')}>
          Item 3
        </Menu.Item>
        <Menu.Item active={value === '4'} onClick={() => setValue('4')}>
          Item 4
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu id="touch" title="Group 3" icon="touch">
        <Menu.Item active={value === '5'} onClick={() => setValue('5')}>
          Item 5
        </Menu.Item>
        <Menu.Item active={value === '6'} onClick={() => setValue('6')}>
          Item 6
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
```

### Controlled usage

```jsx live
() => {
  const [subKeys, setSubKeys] = useState(['understood']);
  const [value, setValue] = useState('1');

  return (
    <>
      <Flex mb="3">
        <Button onClick={() => setSubKeys([])}>Close All</Button>
        <Box mx="1" />
        <Button onClick={() => setSubKeys(['understood', 'kurator', 'touch'])}>
          Open All
        </Button>
      </Flex>
      <Menu subKeys={subKeys} onUpdateSubKeys={setSubKeys}>
        <Menu.SubMenu id="understood" title="Group 1" icon="understood">
          <Menu.Item active={value === '1'} onClick={() => setValue('1')}>
            Item 1
          </Menu.Item>
          <Menu.Item active={value === '2'} onClick={() => setValue('2')}>
            Item 2
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu id="kurator" title="Group 2" icon="kurator">
          <Menu.Item active={value === '3'} onClick={() => setValue('3')}>
            Item 3
          </Menu.Item>
          <Menu.Item active={value === '4'} onClick={() => setValue('4')}>
            Item 4
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu id="touch" title="Group 3" icon="touch">
          <Menu.Item active={value === '5'} onClick={() => setValue('5')}>
            Item 5
          </Menu.Item>
          <Menu.Item active={value === '6'} onClick={() => setValue('6')}>
            Item 6
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};
```

### With current sub only

```jsx live
() => {
  const [value, setValue] = useState('1');

  return (
    <Menu currentSubOnly defaultSubKeys={['understood']}>
      <Menu.SubMenu id="understood" title="Group 1" icon="understood">
        <Menu.Item active={value === '1'} onClick={() => setValue('1')}>
          Item 1
        </Menu.Item>
        <Menu.Item active={value === '2'} onClick={() => setValue('2')}>
          Item 2
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu id="kurator" title="Group 2" icon="kurator">
        <Menu.Item active={value === '3'} onClick={() => setValue('3')}>
          Item 3
        </Menu.Item>
        <Menu.Item active={value === '4'} onClick={() => setValue('4')}>
          Item 4
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu id="touch" title="Group 3" icon="touch">
        <Menu.Item active={value === '5'} onClick={() => setValue('5')}>
          Item 5
        </Menu.Item>
        <Menu.Item active={value === '6'} onClick={() => setValue('6')}>
          Item 6
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
```

## API

### Menu

### Menu.SubMenu

### Menu.Item
