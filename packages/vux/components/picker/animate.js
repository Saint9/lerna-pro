const time = Date.now || function () {
  return +new Date()
}

let running = {}
let counter = 1
const desiredFrames = 60
const millisecondsPerSecond = 1000

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
if (typeof window !== 'undefined') {
  ;(function () {
    let lastTime = 0
    const vendors = ['ms', 'moz', 'webkit', 'o']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const id = window.setTimeout(function () {
          // eslint-disable-next-line standard/no-callback-literal
          callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      }
    }
  }())
}

export default {

  // A requestAnimationFrame wrapper / polyfill.
  requestAnimationFrame: (function () {
    if (typeof window !== 'undefined') {
      const requestFrame = window.requestAnimationFrame
      return function (callback, root) {
        requestFrame(callback, root)
      }
    }
  })(),

  // Stops the given animation.
  stop (id) {
    const cleared = running[id] != null
    if (cleared) {
      running[id] = null
    }
    return cleared
  },

  // Whether the given animation is still running.
  isRunning (id) {
    return running[id] != null
  },

  // Start the animation.
  start (stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
    // eslint-disable-next-line
    const _this = this
    const start = time()
    let lastFrame = start
    let percent = 0
    let dropCounter = 0
    const id = counter++

    if (!root) {
      root = document.body
    }

    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
      const newRunning = {}
      for (const usedId in running) {
        newRunning[usedId] = true
      }
      running = newRunning
    }

    // This is the internal step method which is called every few milliseconds
    // eslint-disable-next-line no-var
    var step = function (virtual) {
      // Normalize virtual value
      const render = virtual !== true
      // Get current time
      const now = time()

      // Verification is executed before next animation step
      if (!running[id] || (verifyCallback && !verifyCallback(id))) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false)
        return
      }

      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state variables up-to-date with progress in time.
      if (render) {
        const droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
        for (let j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      }

      // Execute step callback, then...
      const value = easingMethod ? easingMethod(percent) : percent
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null)
      } else if (render) {
        lastFrame = now
        _this.requestAnimationFrame(step, root)
      }
    }

    // Mark as running
    running[id] = true
    // Init first step
    _this.requestAnimationFrame(step, root)
    // Return unique animation ID
    return id
  }
}
