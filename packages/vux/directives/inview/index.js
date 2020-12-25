import Inview from './inview'
export default {
  update (option) {
    if (!option || !option.id) {
      return console.error('no id specified')
    }
    // eslint-disable-next-line
    const _this = this
    const id = option.id
    const vm = this.vm
    vm.$nextTick(function () {
      _this._inview = Inview(_this.el, function (isInView) {
        if (isInView) {
          vm.$emit('on-view-enter', id)
        } else {
          vm.$emit('on-view-leave', id)
        }
      })
    })
  },
  // eslint-disable-next-line
  unbind () {}
}
