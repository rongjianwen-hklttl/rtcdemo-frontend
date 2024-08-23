import colors from '../../colors'
import chroma from 'chroma-js'
import _ from 'lodash'

import light from '../light'
import main from './main'
import header from './header'
import leftSidebar from './leftSidebar'
import rightSidebar from './rightSidebar'
import dropzone from './dropzone'

export default {
  ...light,
  palette: {
    mode: 'dark',
    primary: {
      main: colors.yellow.main
    },
    secondary: {
      main: colors.yellow.main
    }
  },
  main: {
    ...light.main,
    ...main,
  },
  header: {
    ...light.header,
    ...header,
  },
  leftSidebar: {
    ...light.leftSidebar,
    ...leftSidebar,
  },
  rightSidebar: {
    ...light.rightSidebar,
    ...rightSidebar,
  },
  dropzone: {
    ...light.dropzone,
    ...dropzone,
  },
}
