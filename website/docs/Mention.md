---
id: mention
title: Mention
---

Mention component.

## When To Use

When need to mention someone or something.

## Examples

```js
import { Mention } from 'tailor-ui';
```

### Basic

```jsx live
<Mention
  defaultValue="我想吃一份{{食物}}"
  suggestions={['食物', '國家', '城市', '語言', '品牌']}
  onChange={(value) => console.log(value)}
/>
```

### Creatable

```jsx live
() => {
  const [value, setValue] = useState('我想吃一份{{食物}}');
  const [suggestions, setSuggestions] = useState([
    '食物',
    '國家',
    '城市',
    '語言',
    '品牌',
  ]);

  return (
    <Mention
      creatable
      value={value}
      suggestions={suggestions}
      onChange={(value) => {
        setValue(value);
        console.log(value);
      }}
      onMentionCreate={(newMention) => {
        setSuggestions((prevSuggestions) => [...prevSuggestions, newMention]);
      }}
    />
  );
};
```

### Creatable & Highlight Invalid

```jsx live
() => {
  const [value, setValue] = useState('我想吃一份{{食物}}');
  const [suggestions, setSuggestions] = useState([
    '食物',
    '國家',
    '城市',
    '語言',
    '品牌',
  ]);

  return (
    <Mention
      creatable
      highlightInvalid
      value={value}
      suggestions={suggestions}
      onChange={(value) => {
        setValue(value);
        console.log(value);
      }}
      onMentionCreate={(newMention) => {
        setSuggestions((prevSuggestions) => [...prevSuggestions, newMention]);
      }}
    />
  );
};
```

### Disabled

```jsx live
<Mention
  defaultValue="我想吃一份{{食物}}"
  suggestions={['食物', '國家', '城市', '語言', '品牌']}
  onChange={(value) => console.log(value)}
  disabled
/>
```

```jsx live
() => {
  const [value, setValue] = useState('I want a {{food}}');

  return (
    <FormField label="With Error:" validationMessage="Something went wrong!">
      <Mention
        suggestions={['drink', 'food']}
        value={value}
        onChange={setValue}
      />
    </FormField>
  );
};
```

## API

| Property         | Description                                                                  | Type                           | Default                                         |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------- |
| suggestions      | Suggestion content                                                           | string[]                       | `[]`                                            |
| disabled         | Tell if the mention is disabled.                                             | `boolean`                      | `false`                                         |
| creatable        | Create suggestion when mention text which is not exists in suggestions props | `boolean`                      | `false`                                         |
| highlightInvalid | highlight the invalid mentioned text                                         | `boolean`                      | `false`                                         |
| formatCreateText | format the create text                                                       | `(text: string) => string`     | `text => Press Enter to create mention: {text}` |
| onMentionCreate  | Trigger when the new suggestion created                                      | `(newMention: string) => void` |                                                 |
| value            | Set value of mentions                                                        | `string`                       |                                                 |
| defaultValue     | Default value                                                                | `string`                       |                                                 |
| onBlur           | Trigger when mentions lose focus                                             | `() => void`                   |                                                 |
| onChange         | Trigger when value changed                                                   | `(value: string) => void`      |                                                 |
