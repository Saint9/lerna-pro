<template>
  <div class="basic-layout">
    <van-nav-bar fixed :title="title"></van-nav-bar>
    <router-view class="container" />
    <van-tabbar route>
      <van-tabbar-item name="home" icon="home-o" to="/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="list" to="/tabbar/list">
        <span>列表</span>
        <template #icon="props">
          <img :src="props.active ? icon.listActive : icon.listInactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="firend" icon="orders-o" to="/tabbar/form">表单</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { NavBar, Tabbar, TabbarItem } from 'vant'
const listActive = require('@/assets/tabbar/list-active.svg')
const listInactive = require('@/assets/tabbar/list-inactive.svg')
export default {
  name: 'BasicLayout',
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      icon: {
        listActive,
        listInactive
      }
    }
  },
  computed: {
    title: function () {
      const { meta, name } = this.$route
      return meta.title || name
    }
  }
}
</script>
