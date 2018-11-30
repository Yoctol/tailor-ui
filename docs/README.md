# Tailor UI

[![npm](https://img.shields.io/npm/v/@yoctol/tailor-ui.svg)](https://www.npmjs.com/package/@yoctol/tailor-ui)
[![CircleCI](https://circleci.com/gh/Yoctol/tailor-ui.svg?style=shield&circle-token=cd9b3c150c27a37f0aa28d41486ee35ac16652ac)](https://circleci.com/gh/Yoctol/tailor-ui)

### [Docz](https://tailor-ui.netlify.com)

### Installation

```bash
// with npm
npm install tailor-ui

// with yarn
yarn add tailor-ui
```

### Usage

Here is a quick example to get you started, it's all you need:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, UIProvider } from 'tailor-ui';

const App = () => (
  <UIProvider>
    <Button>Hello World</Button>
  </UIProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

### Development

```bash
git clone git@github.com:Yoctol/tailor-ui.git
```

Instal dependencies and run docz:

```bash
cd tailor-ui && yarn
yarn docz:dev
```
