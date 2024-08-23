import {
  getCurrentLang,
  getCurrentThemeName
} from '../helpers'

export default {
  lang: getCurrentLang(),
  themeName: getCurrentThemeName(),
  leftSidebar: {
    hidden: false,
  },
  rightSidebar: {
    hidden: false,
  },
  videoChat: {
    hidden: false,
  },
  controlPanel: {
    hidden: false,
  },
  debugMode: false,
  currentTab: 'videoChat',
  currentLsTab: 'lsUsers',
}
