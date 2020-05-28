<template>
  <div class="no-data">
    <div class="img" :style="setImg"></div>
    <p v-html="noData.msg"></p>
  </div>
</template>

<script>
export default {
  name: 'index',

  props: {
    noData: Object
  },

  computed: {
    setImg () {
      return `background: url(${this.noData.img || require('@/assets/images/no-data.png')}) 0 0 no-repeat; background-size: 100%; margin-top: ${this.noData.marginTop}`;
    }
  },

  data () {
    return {}
  },

  mounted () {},

  methods: {}
}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/extends";

  .no-data {
    .img {
      width: 140px;
      height: 100px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 28px;
    }

    p {
      font-size: 16px;
      @extend %pfr;
      font-weight: 400;
      color: rgba(164, 172, 188, 1);
      line-height: 22px;
      text-align: center;
    }
  }
</style>
