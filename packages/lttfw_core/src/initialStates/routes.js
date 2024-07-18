const routes = {
  '/': {
    path: '/',
    name: 'home',
    page_name: 'home',
    page_component: 'Home',
    page_props: {},
    theme_name: 'classic'
  }
}

export default Object.keys(routes)
  .sort()
  .reverse()
  .reduce((accumulator, key) => {
    accumulator[key] = routes[key]
    return accumulator
  }, {})
