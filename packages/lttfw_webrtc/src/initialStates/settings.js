const lang = localStorage.getItem('lang')

export default {
  lang: lang ? lang : 'zh_hk',
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
  currentTab: 'videoChat',
}
