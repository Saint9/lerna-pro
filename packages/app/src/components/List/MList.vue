<template>
  <div class="m-list">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <slot>
        <template v-if="dataList.length > 0">
          <m-card
            v-for="item in dataList"
            :key="item.id"
            :thumb="item.thumb"
            :title="item.title"
            :desc="item.description"
          />
        </template>
      </slot>
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import MCard from './MCard.vue'
import CardProps from './CardProps'
export default {
  name: 'MList',
  props: {
    url: String,
    formData: Object,
    ...CardProps
  },
  components: {
    MescrollVue,
    MCard
  },
  data () {
    return {
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback // 上拉回调
        // htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        // noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        // 避免列表数据过少 (比如只有一条数据), 显示无更多数据会不好看
        // 这就是为什么无更多数据有时候不显示的原因
        // toTop: {
        //   //回到顶部按钮
        //   src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
        //   offset: 1000 //列表滚动1000px才显示回到顶部按钮
        // },
        // empty: {
        //   //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        //   warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
        //   icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
        //   tip: "暂无相关数据~" //提示
        // }
      },
      dataList: [] // 列表数据
    }
  },
  methods: {
    mescrollInit (mescroll) {
      console.log(mescroll)
      // if (this.url) {
      //   this.axiosList({ pageNo: 1, pageSize: 10 }, mescroll)
      // }
    },
    // 上拉回调
    upCallback (page, mescroll) {
      const { num, size } = page
      this.axiosList({ pageNo: num, pageSize: size }, mescroll)
      console.log(mescroll)
    },
    async axiosList (params, mescroll) {
      try {
        const { list, total } = await this.$axios.post(this.url, params)
        console.log(list)
        if (params.pageNo === 1) this.dataList = []
        this.dataList = this.dataList.concat(list)
        this.$nextTick(() => {
          console.log(this.dataList.length)
          console.log(total)
          mescroll.endBySize(list.length, total)
        })
      } catch (error) {
        mescroll.endErr()
      }
    }
  }
}
</script>
