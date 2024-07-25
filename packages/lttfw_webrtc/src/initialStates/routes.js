const routes = {
  '/session/:roomName/:userName/avatar': {
    path: '/session/:roomName/:userName/avatar',
    name: 'room',
    page_name: 'room',
    page_component: 'Room',
    page_props: {},
    theme_name: 'classic'
  },
  '/session/:roomName/:userName': {
    path: '/session/:roomName/:userName',
    name: 'login',
    page_name: 'login',
    page_component: 'Login',
    page_props: {},
    theme_name: 'classic'
  },
  '/session/:roomName': {
    path: '/session/:roomName',
    name: 'login',
    page_name: 'login',
    page_component: 'Login',
    page_props: {},
    theme_name: 'classic'
  },
  '/': {
    path: '/',
    name: 'home',
    page_name: 'home',
    page_component: 'Home',
    page_props: {},
    theme_name: 'classic'
  },
  '/login': {
    path: '/login',
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
