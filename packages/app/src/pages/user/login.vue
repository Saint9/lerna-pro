<template>
  <div class="user-login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
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
import {
  Form,
  Field
} from 'vant'
const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写密码' }]
}
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field
  },
  data () {
    return {
      username: '',
      password: '',
      rules: Object.freeze(rules)
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
