import colors from '../../colors'
import chroma from 'chroma-js'

const mui = {
  typography: {
    fontFamily: ['Noto Sans TC'].join(','),
    button: {
      textTransform: 'none'
    }
  },
  transitions: {
    //create: () => 'none'
  },
  palette: {
    primary: {
      main: colors.blue.main
    },
    secondary: {
      main: colors.yellow.main
    }
  }
}

export default mui
