/// <reference path="./.d.ts" />

import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import mitt from 'mitt'

import { EmitterContext } from './contexts'

import { store } from './store'

import { App } from './app'

import 'ress/dist/ress.min.css'
import './static/index.css'

// TODO: Clear store upon unmount?

const Root: React.FC = () => (
  <React.StrictMode>
    <ReduxProvider store={store}>
      <EmitterContext.Provider value={mitt()}>
        <App />
      </EmitterContext.Provider>
    </ReduxProvider>
  </React.StrictMode>
)

const root = document.getElementById('av')
ReactDOM.render(<Root />, root)
