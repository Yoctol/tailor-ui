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

## I18n Examples

```jsx live
() => {
  const { locale, setLocale } = useLocaleContext();
  const [visible, setVisible] = useState(false);
  const modal = useModal();

  const contents = {
    en_US: {
      modal: {
        title: 'This is a Modal',
        content: 'This is the content of Modal',
        openButton: 'Open Modal',
      },
      confirmModal: {
        title: 'Do you Want to delete these items?',
        content: 'Some descriptions',
      },
      popconfirm: {
        content: 'Are you sure to delete this todo?',
      },
      upload: {
        withSuccess: 'With Success: ',
        withFail: 'With Fail: ',
      },
    },
    zh_Hant: {
      modal: {
        title: '這是一個 Modal',
        content: '這是 Modal 的內容',
        openButton: '打開 Modal',
      },
      confirmModal: {
        title: '你確定要刪掉這些東西嗎？',
        content: '一些內容',
      },
      popconfirm: {
        content: '你確定要刪掉這個待辦事項嗎？',
      },
      upload: {
        withSuccess: '成功：',
        withFail: '失敗：',
      },
    },
  }[locale];

  return (
    <>
      <RadioGroup value={locale} onChange={setLocale}>
        <Radio value="en_US">English</Radio>
        <Radio value="zh_Hant">正體中文</Radio>
      </RadioGroup>

      <Box mt="3">
        <Flex>
          <Modal
            title={contents.modal.title}
            visible={visible}
            closable
            onConfirm={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          >
            <div>{contents.modal.content}</div>
          </Modal>
          <Button onClick={() => setVisible(true)}>{contents.modal.openButton}</Button>

          <Button
            ml="2"
            onClick={() => {
              modal.confirm({
                title: contents.confirmModal.title,
                content: contents.confirmModal.content,
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
              content={contents.popconfirm.content}
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
          <Flex alignItems="center">
            <Box mr="2">{contents.upload.withSuccess}</Box>
            <Upload
              onSelect={() =>
                new Promise(resolve => setTimeout(resolve, 2000))
              }
            />
          </Flex>
        </Box>
        <Box mt="1">
          <Flex alignItems="center">
            <Box mr="2">{contents.upload.withFail}</Box>
            <Upload
              onSelect={() =>
                new Promise((resolve, reject) => setTimeout(reject, 2000))
              }
            />
          </Flex>
        </Box>
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
