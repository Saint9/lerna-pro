<template>
  <div :class="bem()">
    <div v-if="showThumb" :class="bem('thumb')">
      <slot name="thumb">
        <van-image :src="thumb" />
      </slot>
    </div>
    <div :class="bem('content')">
      <h3 :class="bem('title')">
        <slot name="title">{{ title }}</slot>
      </h3>
      <div :class="bem('desc')">
        <slot name="desc">{{ desc }}</slot>
      </div>
      <div :class="bem('footer')">
        <span v-if="showDate" :class="bem('date')">
          <slot name="date">{{ date }}</slot>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from 'vant'
import CardProps from './CardProps'
import createBEM from '@/utils/bem'
import './card.less'
export default {
  name: 'MCard',
  props: {
    ...CardProps
  },
  components: {
    [VanImage.name]: VanImage
  },
  computed: {
    showThumb () {
      return this.$scopedSlots.thumb || this.$props.thumb
    },
    showDate () {
      return this.$scopedSlots.date || this.$props.date
    }
  },
  // mounted () {
  //   console.log(this.bem())
  // },
  methods: {
    bem: createBEM('m-card')
  }
}
</script>
