import { Store, Engine } from '@lttfw/core'

import * as slices from './slices'
import * as routes from './routes'

const store = new Store({
  slices
})

const engine = new Engine({
  store,
  routes
})
engine.render()
