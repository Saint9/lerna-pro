/**
 * v-orientaion="landscape" v-orientaion="portrait"
 */
import Orientation from './orientation'
export default {
  bind () {
    // eslint-disable-next-line
    const _this = this
    const value = this.expression
    const _value = value.toString()[0].toUpperCase() + value.toString().slice(1)

    if (Orientation['is' + _value]()) {
      this.el.style.display = 'block'
    } else {
      this.el.style.display = 'none'
    }

    Orientation.change(function () {
      const info = Orientation.getInfo()
      _this.el.style.display = info[value] ? 'block' : 'none'
    })
  },
  // eslint-disable-next-line
  update () {
  },
  // eslint-disable-next-line
  unbind () {
  }
}
