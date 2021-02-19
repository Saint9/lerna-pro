<template>
  <div class="tabbar-list">
    <m-list url="/mock/product" desc="description" />
  </div>
</template>
<script>
import MList from '@/components/List/MList.vue'
import './index.less'
export default {
  components: {
    MList
  },
  data () {
    return {}
  }
}
</script>
