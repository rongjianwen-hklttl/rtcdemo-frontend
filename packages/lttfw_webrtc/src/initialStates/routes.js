const routes = {
  '/:roomName/:userName': {
    path: '/:roomName/:userName',
    name: 'home',
    page_name: 'home',
    page_component: 'Home',
    page_props: {},
    theme_name: 'classic'
  },
  '/': {
    path: '/',
    name: 'login',
    page_name: 'login',
    page_component: 'Login',
    page_props: {},
    theme_name: 'classic'
  },
  '*': {
    path: '*',
    name: 'not_found',
    page_name: 'not_found',
    page_component: 'NotFound',
    page_props: {},
    theme_name: 'classic'
  },
}

export default Object.keys(routes)
  .sort()
  .reverse()
  .reduce((accumulator, key) => {
    accumulator[key] = routes[key]
    return accumulator
  }, {})
