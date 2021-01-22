<template>
  <div class="basic-layout">
    <van-tabbar v-model="activeName">
      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="firend" icon="friends-o">好友</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import {
  Tabbar,
  TabbarItem
} from 'vant'
export default {
  name: 'BasicLayout',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      activeName: 'home'
    }
  }
}
</script>
