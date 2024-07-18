import Store from './Store'

import * as themes from './themes'
import * as initialStates from './initialStates'
import * as slices from './slices'
import * as pages from './pages'
import * as layouts from './layouts'
import * as helpers from './helpers'
import components from './components'

import Engine from './Engine'

const store = new Store({
  initialStates,
  slices
})

const base_url = ''
const api_url = '/api'
const basename = ''
const env = {
  base_url,
  api_url,
  ckeditor_upload_url: api_url+'/ckeditor5/upload?dest=ckeditor',
  upload_url: api_url+'/upload',
  basename,
  cookie_path: '/',
  cookie_expires: 365,
  cookie_lang_key: 'lang_name'
}

const engine = new Engine({
  base_url: env.base_url,
  api_url: env.api_url,
  basename: env.basename,
  themeName: 'classic_light',
  themes,
  layoutName: 'Classic',
  layouts,
  components,
  store,
  pages,
  env
})
engine.render()