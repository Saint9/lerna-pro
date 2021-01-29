<template>
  <div class="blank-layout">
    <van-nav-bar title="标题" left-arrow @click-left="onBack">
      <template #right>
        <slot name="nav-right"></slot>
      </template>
    </van-nav-bar>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { NavBar } from 'vant'
export default {
  name: 'BlankLayout',
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onBack () {

    }
  }
}
</script>