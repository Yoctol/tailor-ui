import React from 'react'
import { hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'
import Wrapper from 'src/utils/DoczWrapper'
import config from './config.json'
import entries from './entries.json'

const Root = ({ imports }) => (
  <Theme
    config={config}
    entries={entries}
    imports={imports}
    hashRouter={false}
    wrapper={Wrapper}
  />
)

export default hot(module)(Root)
