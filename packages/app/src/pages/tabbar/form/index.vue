<template>
  <div class="tabbar-form">
    <van-form input-align="right" error-message-align="right">
      <van-field
        required
        name="text"
        label="文本"
        placeholder="文本框"
        :rules="rules.text"
        v-model="formData.text"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { Form, Field, Button } from 'vant'

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    const rules = {
      text: [{ required: true, message: '请填写内容' }]
    }

    return {
      rules: Object.freeze(rules),
      formData: {
        text: ''
      }
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit: ', values)
    }
  }
}
</script>
<style lang="less">
.tabbar-form {
  > .van-form {
    margin-top: 10px;
  }
}
</style>
