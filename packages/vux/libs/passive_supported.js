let passiveSupported = false

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  })
  window.addEventListener('test', null, options)
} catch (err) {}

export default passiveSupported
