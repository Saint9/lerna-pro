<template>
  <div class="m-card">
    <div v-if="thumb" class="m-card-thumb">
      <van-image :src="thumb" />
    </div>
    <div class="m-card-content">
      <h3 class="m-card-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <div class="m-card-desc">
        <slot name="desc">{{ desc }}</slot>
      </div>
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
import CardProps from './CardProps'
import './card.less'
export default {
  name: 'MCard',
  props: {
    ...CardProps
  },
  components: {
    [VanImage.name]: VanImage
  }
}
</script>
