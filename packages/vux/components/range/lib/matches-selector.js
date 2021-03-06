/* eslint-disable */
/**
 * Module dependencies.
 */

import { all } from './query'

/**
 * Element prototype.
 */

let proto = {}

if (typeof window !== 'undefined') {
  proto = window.Element.prototype
}

/**
 * Vendor function.
 */

const vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector

/**
 * Expose `match()`.
 */

export default match

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match (el, selector) {
  if (!el || el.nodeType !== 1) return false
  if (vendor) return vendor.call(el, selector)
  const nodes = all(selector, el.parentNode)
  for (let i = 0; i < nodes.length; ++i) {
    if (nodes[i] === el) return true
  }
  return false
}
