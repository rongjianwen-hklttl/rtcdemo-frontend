import { Store, Engine } from '@lttfw/core'

import * as themes from './themes'
import * as initialStates from './initialStates'
import * as slices from './slices'
import * as routes from './routes'

const store = new Store({
  initialStates,
  slices
})

const engine = new Engine({
  themes,
  store,
  routes
})
engine.render()
