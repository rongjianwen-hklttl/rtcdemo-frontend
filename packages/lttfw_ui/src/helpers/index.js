export * from '@lttfw/core/src/helpers'

import currency from 'currency.js'
import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'
import DropTarget from '@uppy/drop-target'

export function isElementVisible(el, holder) {
  holder = holder || document.body
  const { top, bottom, height } = el.getBoundingClientRect()
  const holderRect = holder.getBoundingClientRect()

  return top <= holderRect.top
    ? holderRect.top - top <= height
    : bottom - holderRect.bottom <= height
}

export function currencyFormat(v) {
  function format(currency, options) {
    var format = options.format(currency, options)
    if (currency.cents() === 0) {
      return format.slice(0, format.length - (options.precision + 1))
    }
    return format
  }
  return currency(v).format(format)
}

export function create_uppy(options) {
  const { target = document.body, ...other } = options
  return new Uppy({debug: true, autoProceed: true, ...other}).use(DropTarget, {
    target,
  })
}

export function init_uppy(uppy, options) {
  const { endpoint, fieldName = 'files' } = options

  const headers = {
    authorization: 'Bearer '+localStorage.getItem('access_token'),
  }

  uppy.use(XHR, { headers, endpoint, fieldName})
}
