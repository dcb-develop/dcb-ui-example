<template>
  <div class="wrapper">
    <ul class="menus">
      <router-link tag="li" class="mb-16" v-for="(item, index) in menus" :to="{name: item.url}" :key="index">
        {{item.title}}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',

  data () {
    return {
      menus: [
        {
          title: 'PDF在线预览',
          url: 'pdf-review'
        },
        {
          title: '表单提交',
          url: 'form'
        },
        {
          title: '底部固定',
          url: 'fixed-footer'
        },
        {
          title: '单选',
          url: 'radio'
        },
        {
          title: '图片上传裁剪',
          url: 'image-clip'
        },
        {
          title: '消息滚动',
          url: 'seamless'
        }
      ]
    }
  },

  mounted () {
    this.$jsonp('https://trip-coupon.oss-cn-chengdu.aliyuncs.com/javascript/demo.js', {callbackQuery: 'cb', callbackName: 'jsonpFunc'}).then(res => {
      console.log(res)
    })
  },

  methods: {}
}
</script>

<style scoped lang="scss">
  @import "~style/variable";
  @import "~style/extends";

  .menus {
    @extend %flex-items-center;
    flex-wrap: wrap;
    li {
      border-radius: 4px;
      border: 1px solid $color5;
      color: $color1;
      align-items: center;
      font-size: $fz16;
      font-weight: bold;
      font-family: $pfm;
      height: 25%;
      padding: 16px;
      text-align: center;
      width: 48%;

      &:nth-child(odd) {
        margin-right: 4%;
      }
    }
  }
</style>
