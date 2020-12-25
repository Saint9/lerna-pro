/**
 * Module dependencies.
 */
import { indexof } from '../utils'

/**
 * Whitespace regexp.
 */

const re = /\s+/

/**
 * toString reference.
 */

const toString = Object.prototype.toString

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList (el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required')
  }
  this.el = el
  this.list = el.classList
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function (name) {
  // classList
  if (this.list) {
    this.list.add(name)
    return this
  }

  // fallback
  const arr = this.array()
  const i = indexof(arr, name)
  if (!~i) arr.push(name)
  this.el.className = arr.join(' ')
  return this
}

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function (name) {
  if (toString.call(name) === '[object RegExp]') {
    return this.removeMatching(name)
  }

  // classList
  if (this.list) {
    this.list.remove(name)
    return this
  }

  // fallback
  const arr = this.array()
  const i = indexof(arr, name)
  if (~i) arr.splice(i, 1)
  this.el.className = arr.join(' ')
  return this
}

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function (re) {
  const arr = this.array()
  for (let i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i])
    }
  }
  return this
}

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function (name, force) {
  // classList
  if (this.list) {
    if (typeof force !== 'undefined') {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name) // toggle again to correct
      }
    } else {
      this.list.toggle(name)
    }
    return this
  }

  // fallback
  if (typeof force !== 'undefined') {
    if (!force) {
      this.remove(name)
    } else {
      this.add(name)
    }
  } else {
    if (this.has(name)) {
      this.remove(name)
    } else {
      this.add(name)
    }
  }

  return this
}

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function () {
  const className = this.el.getAttribute('class') || ''
  const str = className.replace(/^\s+|\s+$/g, '')
  const arr = str.split(re)
  if (arr[0] === '') arr.shift()
  return arr
}

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function (name) {
  return this.list
    ? this.list.contains(name)
    : !!~indexof(this.array(), name)
}

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

export default function (el) {
  return new ClassList(el)
}