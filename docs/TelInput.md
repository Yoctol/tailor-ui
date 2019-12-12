---
id: tel-input
title: TelInput
---

Entering and validating international telephone numbers.

## When To Use

- you want to format and validating the user's phone numbers.

## Examples

```js
import { TelInput } from 'tailor-ui';
```

### Basic

```jsx live
<TelInput onChange={console.log} />
```

### With errors

```jsx live
<FormField label="With Error" validationMessage="Something errors happend">
  <TelInput onChange={console.log} />
</FormField>
```

## API

The component is based on `react-intl-tel-input`, please check more API on it's [document](https://patw0929.github.io/react-intl-tel-input/).
