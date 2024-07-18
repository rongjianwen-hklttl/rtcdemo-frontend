import colors from '../../colors'
import chroma from 'chroma-js'

const footer = {
  bgColor: chroma(colors.white.main).darken(0.2).hex(),
  color: colors.black.main,
  height: '2rem',
}

export default footer
