---
id: ui-provider
title: UIProvider
---

## Usage

`UIProvider` provides theme to components, and provides a uniform localization support for built-in text of components.

```jsx
import ReactDOM from 'react-dom';
import { UIProvider, locales } from 'tailor-ui';

const { zh_Hant } = locales;

ReactDOM.render(
  <UIProvider locale={zh_Hant}>
    {children}
  </UIProvider>,
  document.querySelector('#root')
);
```

## Examples

```jsx live
() => {
  const [value, setValue] = useState('en_US');
  const [visible, setVisible] = useState(false);
  const modal = useModal();

  return (
    <>
      <RadioGroup value={value} onChange={setValue}>
        <Radio value="en_US">English</Radio>
        <Radio value="zh_Hant">正體中文</Radio>
      </RadioGroup>

      <Box mt="3">
        <UIProvider locale={locales[value]}>
          <>
            <Flex>
              <Modal
                title="This is a Modal"
                visible={visible}
                closable
                onConfirm={() => setVisible(false)}
                onCancel={() => setVisible(false)}
              >
                <div>This is the content of Modal</div>
              </Modal>
              <Button onClick={() => setVisible(true)}>Open Modal</Button>

              <Button
                ml="2"
                onClick={() => {
                  modal.confirm({
                    title: 'Do you Want to delete these items?',
                    content: 'Some descriptions',
                    onConfirm: () => console.log('confirmed!'),
                    onCancel: () => console.log('canceled!'),
                  });
                }}
              >
                Confirm Modal
              </Button>

              <Box ml="2">
                <Popconfirm
                  position={Position.BOTTOM}
                  content="Are you sure to delete this todo?"
                  onConfirm={() => console.log('confirm')}
                  onCancel={() => console.log('cancel')}
                >
                  <Button>Popconfirm</Button>
                </Popconfirm>
              </Box>
            </Flex>
            <Box mt="3">
              <DatePicker onChange={() => {}} />
            </Box>
            <Box mt="3">
              <Flex>
                <Box mr="2">With Success:</Box>
                <Upload
                  onSelect={() =>
                    new Promise(resolve => setTimeout(resolve, 2000))
                  }
                />
              </Flex>
            </Box>
            <Box mt="1">
              <Flex>
                <Box mr="2">With Failed:</Box>
                <Upload
                  onSelect={() =>
                    new Promise((resolve, reject) => setTimeout(reject, 2000))
                  }
                />
              </Flex>
            </Box>
          </>
        </UIProvider>
      </Box>
    </>
  );
}
```


## API

| Property | Description | Type         | Default |
|----------|-------------|--------------|---------|
| `locale` |             | `LocaleType` |         |
| `theme`  |             | `ThemeType`  |         |
