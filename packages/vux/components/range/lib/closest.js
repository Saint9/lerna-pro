/**
 * Module Dependencies
 */

import matches from './matches-selector'

/**
 * Closest
 *
 * @param {Element} el
 * @param {String} selector
 * @param {Element} scope (optional)
 */

function closest (el, selector, scope) {
  scope = scope || document.documentElement

  // walk up the dom
  while (el && el !== scope) {
    if (matches(el, selector)) return el
    el = el.parentNode
  }

  // check scope for match
  return matches(el, selector) ? el : null
}

/**
 * Export `closest`
 */

export default closest
