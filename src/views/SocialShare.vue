<template>
  <div class="wrapper">
    <p @click="onShare">分享</p>

    <social-share v-model="show" title="签名" description="这个是描述" :options="options"/>
  </div>
</template>

<script>
  import SocialShare from '@/components/Share'

  export default {
    name: 'Share',

    components: {
      SocialShare
    },

    data() {
      return {
        show: false,
        options: ['微信', '朋友圈', 'QQ', 'QQ空间', '微博']
      }
    },

    mounted() {
    },

    methods: {
      onShare () {
        this.show = true;
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
