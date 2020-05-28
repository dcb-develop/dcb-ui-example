<template>
  <div class="loading" v-if="show" @touchmove.prevent @touchmove="_stopDef" @mousewheel="_stopDef" :class="{'load-mask': mask}">
    <div class="load-inner">
      <div class="load-img"></div>
      <div class="load-text">{{text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: '加载中'
      },
      mask: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      _stopDef (e) {
        e.preventDefault();
      }
    }
  }
</script>

<style scoped lang="scss">
  .loading {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 400;
    width: 100%;

    &.load-mask {
      background-color: rgba(255, 255, 255, 1);
    }

    .load-inner {
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      width: 105px;
      height: 105px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -80%);

      .load-img {
        background: url("../../assets/images/loading.gif") center no-repeat;
        background-size: cover;
        width: 43px;
        height: 43px;
        margin: 15px auto;
      }

      .load-text {
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        text-align: center;
      }
    }
  }
</style>
