<template>
  <div class="m-select">
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="选择器"
      placeholder="点击选择城市"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  Field,
  Popup,
  Picker
} from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data () {
    return {
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false
    }
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    }
  }
}
</script>