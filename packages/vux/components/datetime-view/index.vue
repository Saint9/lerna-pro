<template>
  <div></div>
</template>

<script>
import Datetime from '../datetime'
import Picker from '../datetime/datetimepicker'

export default {
  name: 'datetime-view',
  extends: Datetime,
  methods: {
    render () {
      this.$nextTick(() => {
        this.picker && this.picker.destroy()
        this.picker = new Picker(Object.assign(this.pickerOptions, {
          renderInline: true
        }))
        // #2797
        this.$nextTick(() => {
          this.picker.show()
        })
      })
    }
  }
}
</script>
