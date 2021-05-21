import * as preact from 'preact'

import 'ress'
import './main.scss'

import { Store, StoreContext } from '@/store'
import { App } from '@/app'

const store = new Store()

const Root: preact.FunctionComponent = () => {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  )
}

preact.render(<Root />, document.body)
