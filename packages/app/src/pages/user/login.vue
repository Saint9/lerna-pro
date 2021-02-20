<template>
  <div class="user-login">
    <img class="logo" src="@/assets/logo.svg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="telephone"
        name="telephone"
        type="tel"
        maxlength="11"
        left-icon="contact"
        placeholder="手机号"
        :rules="rules.telephone"
      />
      <van-field
        v-model="password"
        name="password"
        type="password"
        placeholder="密码"
        :rules="rules.password"
      >
        <template #left-icon>
          <van-icon :name="IconLock" />
        </template>
      </van-field>
      <van-button block type="info" native-type="submit">登录</van-button>
    </van-form>
    <div class="link-cell">
      <router-link to="/home">忘记密码？</router-link>
      <router-link to="/home">注册</router-link>
    </div>
  </div>
</template>
<script>
import { Form, Field, Icon, Button } from 'vant'
import { phone } from '@/utils/regexp'
import './login.less'
const IconLock = require('@/assets/icon-lock.svg')
const rules = {
  telephone: [{ required: true, message: '请填写手机号' }, { pattern: phone, message: '手机号码格式错误' }],
  password: [{ required: true, message: '请填写密码' }]
}
export default {
  components: {
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      telephone: '',
      password: '',
      IconLock,
      rules: Object.freeze(rules)
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
      this.$store.dispatch('account/GetUserInfo')
      this.$router.push({ path: '/home' })
    }
  }
}
</script>
