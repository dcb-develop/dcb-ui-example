<template>
  <div class="toast-box" v-show="show">
    <transition name="v-toast">
      <div class="toast-text v-toast" v-show="show">{{text}}</div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      show: { // 是否显示此toast
        default: false
      },
      text: { // 提醒文字
        default: 'loading'
      },
      time: { // 显示时间
        default: 1500
      }
    },
    updated () { // 时间控制
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.show = false
      }, this.time)
    }
  }
</script>

<style scoped lang="scss">
  @import "~style/global";

  .toast {
    &-box {
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 1000;
    }

    &-text {
      font-family:PingFangSC-Medium,PingFang SC;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(1);
      background: rgba(0, 0, 0, .6);
      border-radius: 8px;
      padding: 13px;
      text-align: center;
      color: #ffffff;
      font-size: 16px;
    }
  }

  .v-toast-enter-active {
    animation: toast-in .5s;
  }

  .v-toast-leave-active {
    animation: toast-out .3s;
  }

  @keyframes toast-in {
    0% {
      transform: translate(-50%, -50%) scale(1.185);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  @keyframes toast-out {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.85);
      opacity: 0;
    }
  }
</style>
