---
id: getting-started
title: Getting Started
slug: /
---

[![npm](https://img.shields.io/npm/v/tailor-ui.svg)](https://www.npmjs.com/package/tailor-ui) [![CircleCI](https://circleci.com/gh/Yoctol/tailor-ui.svg?style=shield&circle-token=3586bec62e7ddc76eca1227bc7a168d680169e09)](https://circleci.com/gh/Yoctol/tailor-ui) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components) [![Netlify Status](https://api.netlify.com/api/v1/badges/3bdf59fa-77c5-4825-be7f-05f70a57d366/deploy-status)](https://app.netlify.com/sites/tailor-ui/deploys)

### Installation

```sh
# with npm
npm install tailor-ui

# with yarn
yarn add tailor-ui
```

### Usage

Here is a quick example to get you started, it's all you need:

```jsx
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
