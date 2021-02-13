<template>
  <div class="basic-layout">
    <router-view class="container" />
    <van-tabbar v-model="activeName">
      <van-tabbar-item name="home" icon="home-o" to="/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="list" to="/list">
        <span>列表</span>
        <template #icon="props">
          <img :src="props.active ? icon.listActive : icon.listInactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="firend" icon="friends-o">好友</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
const listActive = require('@/assets/tabbar/list-active.svg')
const listInactive = require('@/assets/tabbar/list-inactive.svg')
console.log(listActive)
console.log(listInactive)
export default {
  name: 'BasicLayout',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      activeName: 'home',
      icon: {
        listActive,
        listInactive
      }
    }
  }
}
</script>
