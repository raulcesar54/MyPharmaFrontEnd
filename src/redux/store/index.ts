import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from 'redux/reducers'

const makeStore = () => {
  const store = createStore(reducers, composeWithDevTools())

  return store
}

export const storeWrapper = createWrapper(makeStore, { debug: false })
