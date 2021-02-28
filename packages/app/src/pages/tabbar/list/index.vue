<template>
  <div class="tabbar-list">
    <m-list url="/mock/product" thumb="thumb" title="title" desc="description">
      <template #date>2021-02-28</template>
    </m-list>
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
