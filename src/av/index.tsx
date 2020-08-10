// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.d.ts" />

import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store'

import { App } from './app'

import 'ress/dist/ress.min.css'
import 'av_static/index.css'

// TODO: Clear store upon unmount?

const Root: React.FC = () => (
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
)

const root = document.getElementById('av')
ReactDOM.render(<Root />, root)
