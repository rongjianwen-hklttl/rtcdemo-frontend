import React from 'react'
import { useSelector } from 'react-redux'

import JSON5 from 'json5'
import { JSONPath } from 'jsonpath-plus'

import { useTheme, useMediaQuery } from '@mui/material'
import { useLocation, matchPath } from 'react-router-dom'
import { isBoolean } from 'lodash'

export function useMobile() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}

export function useRoute() {
  const routes = useSelector((state) => state.routes)
  const { pathname } = useLocation()

  for (let i in routes) {
    if (matchPath({ path: routes[i].path, exact: true }, pathname)) {
      return routes[i]
    }
  }
  return null
}

export function matchPathname(pattern, pathname) {
  pathname = pathname.endsWith('/') ? pathname : pathname + '/'
  return new RegExp(pattern).test(pathname)
}

export function xpath(json, path) {
  const res = JSONPath({ path, json })
  if (!res) {
    return null
  }
  return res[0]
}

export function forEachDeep(o, f, p) {
  for (let i in o.children) {
    forEachDeep(o.children[i], f, o)
  }
  if (typeof f === 'function') {
    f(o, p)
  }
}

export function transform(obj, predicate) {
  return Object.keys(obj).reduce((memo, key) => {
    if (predicate(obj[key], key)) {
      memo[key] = obj[key]
    }
    return memo
  }, {})
}

export function get_object_diff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key)
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key)
      result.splice(resultKeyIndex, 1)
    }
    return result
  }, Object.keys(obj2))

  return diff
}

export function value_transform(val, type) {
  switch(type) {
    case 'double': {
      return parseFloat(val)
    }
    case 'float': {
      return parseFloat(val)
    }
    case 'int': {
      return parseInt(val)
    }
    case 'integer': {
      return parseInt(val)
    }
    case 'string': {
      if (typeof val === 'string') {
        return val
      }
      return val+""
    }
    case 'boolean': {
      if (typeof val === 'boolean') {
        return val
      }
      if (typeof val === 'string') {
        return (typeof value === "undefined") ? 
          false : 
          // trim using jQuery.trim()'s source 
          value.replace(/^\s+|\s+$/g, "").toLowerCase() === "true"
      }
      return false
    }
    case 'json5': {
      if (typeof val === 'string') {
        return JSON5.stringify(JSON5.parse(val), null, 2)
      }
      return val
    }
    case 'json': {
      if (typeof val === 'string') {
        return JSON.stringify(JSON.parse(val), null, 2)
      }
      return val
    }
  }
  return val
}
