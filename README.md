# Tailor UI

[![npm](https://img.shields.io/npm/v/tailor-ui.svg)](https://www.npmjs.com/package/tailor-ui)
[![CircleCI](https://circleci.com/gh/Yoctol/tailor-ui.svg?style=shield&circle-token=3586bec62e7ddc76eca1227bc7a168d680169e09)](https://circleci.com/gh/Yoctol/tailor-ui)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3bdf59fa-77c5-4825-be7f-05f70a57d366/deploy-status)](https://app.netlify.com/sites/tailor-ui/deploys)

### Documentation

Check out our [documentation website](https://tailor-ui.netlify.com).

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

Run below commands:

```bash
cd tailor-ui
yarn bootstrap
yarn start
```

Watch files changed and check type:

```bash
yarn watch
```
